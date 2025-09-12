<?php

namespace App\Console\Commands;

use App\Models\Roi;
use App\Models\User;
use App\Models\Wallet;
use Carbon\Carbon;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class SendRoi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'nft:send-roi';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send R.O.I to members';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();

        try {
            $roiSchedule = Roi::whereDate('date_start', '<=', Carbon::now())
                ->whereDate('date_end', '>=', Carbon::now())
                ->get();

            Log::info($roiSchedule);

            foreach ($roiSchedule as $roiToday) {
                $joinAmount = User::find($roiToday->from_user_id)->join_amount;

                if ($joinAmount > 0) {
                    $roiAmount = $joinAmount * 1 / 100;

                    $newRoi = new Wallet;
                    $newRoi->type = 'roi';
                    $newRoi->user_id = $roiToday->user_id;
                    $newRoi->from_user_id = $roiToday->from_user_id;
                    $newRoi->debit_amount = 0;
                    $newRoi->credit_amount = $roiAmount;
                    $newRoi->status = "done";
                    $newRoi->save();
                }
            }
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }

        Log::info("R.O.I " . $now . " executed successfully.");
    }
}
