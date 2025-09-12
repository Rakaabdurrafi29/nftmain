<?php

namespace App\Jobs;

use App\Events\WithdrawalSubmitted;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class ProcessUserWithdrawal implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $address;
    protected $wdValue;
    protected $wdId;

    public $timeout = 120;

    public function __construct($address, $wdValue, $wdId)
    {
        $this->address = $address;
        $this->wdValue = $wdValue;
        $this->wdId = $wdId;
    }

    public function handle(): void
    {
        $env = ['PATH' => config('nftlottery.os_path')];

        $process = Process::fromShellCommandline(config('nftlottery.node_path') . ' ' . config('nftlottery.user_wd_script') . ' ' . $this->address . ' ' . $this->wdValue, config('nftlottery.node_working_directory'), $env);
        $process->run();

        $wallet = Wallet::find($this->wdId);
        $user = User::find($wallet->user_id);

        if (!$process->isSuccessful()) {
            Log::info($this->address);
            Log::info($this->wdValue);
            Log::info($this->wdId);
            Log::info($process->getOutput());
            throw new ProcessFailedException($process);
            $wallet->status = "FAILED";
            $wallet->notes = "Jobs failed.";
            $wallet->save();
            event(new WithdrawalSubmitted($user, $wallet));
        }

        $explode = explode("||", $process->getOutput());

        if ($explode[0] === "success") {
            $wallet = Wallet::find($this->wdId);
            $wallet->status = "PENDING";
            $wallet->tx_hash = trim($explode[1]);
            $wallet->notes = "Submitted to blockchain";
            $wallet->save();

            CheckUserWithdrawalStatus::dispatch($this->wdId, $explode[1])->onQueue('check-withdrawal');
        } elseif ($explode[0] === "failed") {
            $wallet = Wallet::find($this->wdId);
            $wallet->status = "FAILED";
            $wallet->notes = trim($explode[1]);
            $wallet->save();
        }

        event(new WithdrawalSubmitted($user, $wallet));
    }
}
