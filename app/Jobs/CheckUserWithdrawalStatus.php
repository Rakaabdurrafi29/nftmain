<?php

namespace App\Jobs;

use App\Events\WithdrawalSent;
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

class CheckUserWithdrawalStatus implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $wdId;
    protected $txHash;

    public $timeout = 300;

    public function __construct($wdId, $txHash)
    {
        $this->wdId = $wdId;
        $this->txHash = $txHash;
    }

    public function handle(): void
    {
        $env = ['PATH' => config('nftlottery.os_path')];

        $process = Process::fromShellCommandline(config('nftlottery.node_path') . ' ' . config('nftlottery.user_wd_check_script') . ' ' . $this->txHash, config('nftlottery.node_working_directory'), $env);
        $process->run();

        $wallet = Wallet::find($this->wdId);
        $user = User::find($wallet->user_id);

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
            Log::info($process->getOutput());
            $wallet->status = "FAILED";
            $wallet->notes = "Jobs failed.";
            $wallet->save();
            event(new WithdrawalSent($user, $wallet));
        }

        if (trim($process->getOutput()) === "success") {
            $wallet = Wallet::find($this->wdId);
            $wallet->status = "DONE";
            $wallet->notes = "Transferred successfully";
            $wallet->save();
            event(new WithdrawalSent($user, $wallet));
        } else {
            sleep(10);
            $this->handle();
        }
    }
}
