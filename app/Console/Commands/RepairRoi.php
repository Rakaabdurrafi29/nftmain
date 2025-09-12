<?php

namespace App\Console\Commands;

use App\Models\LotteryCode;
use App\Models\Roi;
use App\Models\User;
use App\Models\Wallet;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class RepairRoi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'nft:repair-roi';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Repair R.O.I distribution, make existing leaders align with new rules';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $users = User::where('id', '>', 7)->get();

            $user_first = User::orderBy('id', 'ASC')->first();
            $date_start = Carbon::parse($user_first->created_at);

            $date_end = Carbon::now();

            $dateRange = CarbonPeriod::create($date_start, $date_end);

            foreach ($users as $user) {
                Log::info("User ID: " . $user->id);
                // check if referrer R.O.I schedule from this user already exist
                $roiExist = Roi::where('user_id', $user->referral_id)->where('from_user_id', $user->id)->first();
                Log::info("ROI Exist: " . $roiExist);

                // If referrer R.O.I schedule from this user not exist & referrer not Null && this user
                // join amount > 0 (not free account)
                if (!$roiExist && $user->referral_id !== null && $user->join_amount > 0) {
                    $old_roi = Roi::where('user_id', $user->referral_id)->orderBy('date_end', 'DESC')->first();
                    if ($old_roi) {
                        $new_start = Carbon::parse($old_roi->date_end)->addDay()->startOfDay();
                        $new_end = Carbon::parse($old_roi->date_end)->addDays(29)->endOfDay();
                    } else {
                        $new_start = Carbon::parse($user->created_at)->addDay()->startOfDay();
                        $new_end = Carbon::parse($user->created_at)->addDays(29)->endOfDay();
                    }

                    $roiData = new Roi;
                    $roiData->user_id = $user->referral_id;
                    $roiData->from_user_id = $user->id;
                    $roiData->date_start = $new_start;
                    $roiData->date_end = $new_end;
                    $roiData->created_at = Carbon::parse($new_start)->subDay();
                    $roiData->updated_at = Carbon::parse($new_start)->subDay();
                    $roiData->save();
                }

                foreach ($dateRange as $date) {
                    Log::info($date);
                    $roiSchedule = Roi::whereDate('date_start', '<=', Carbon::parse($date))
                        ->whereDate('date_end', '>=', Carbon::parse($date))
                        ->where('user_id', $user->referral_id)
                        ->where('from_user_id', $user->id)
                        ->first();
                    Log::info($roiSchedule);

                    if ($roiSchedule) {
                        $roiExist = Wallet::where('type', 'roi')->where('user_id', $roiSchedule->user_id)->where('from_user_id', $roiSchedule->from_user_id)->whereDate('created_at', $date)->first();

                        $joinAmount = User::find($roiSchedule->from_user_id)->join_amount;

                        if (!$roiExist && $joinAmount > 0) {
                            $roiAmount = $joinAmount * 1 / 100;

                            $newRoi = new Wallet;
                            $newRoi->type = 'roi';
                            $newRoi->user_id = $roiSchedule->user_id;
                            $newRoi->from_user_id = $roiSchedule->from_user_id;
                            $newRoi->debit_amount = 0;
                            $newRoi->credit_amount = $roiAmount;
                            $newRoi->status = "done";
                            $newRoi->created_at = $date;
                            $newRoi->updated_at = $date;
                            $newRoi->save();
                        }
                    }
                }

                $freeAccount = ($user->join_amount === 0);

                if ($freeAccount && $user->id !== null) {
                    $lotteryCode = new LotteryCode;
                    $lotteryCode->code = $this->generateLotteryCode();
                    $lotteryCode->user_id = $user->id;
                    $lotteryCode->is_used = false;
                    $lotteryCode->save();
                }

                $referrer = User::find($user->referral_id);

                if ($user->referral_id !== null && $user->join_amount > 0 && $referrer->join_amount === 0) {
                    $lotteryCode = new LotteryCode;
                    $lotteryCode->code = $this->generateLotteryCode();
                    $lotteryCode->user_id = $user->referral_id;
                    $lotteryCode->is_used = false;
                    $lotteryCode->save();
                }
            }
        } catch (Exception $e) {
            Log::info($e->getMessage());
        }
    }

    private function generateLotteryCode(): string
    {
        try {
            $code = "NLT";
            $num = time();
            $rand = $this->random_string(3);
            $code = $code . $num . $rand;

            $exist = LotteryCode::where('code', $code)->first();

            if ($exist) {
                $code = $this->generateLotteryCode();
            }

            return $code;
        } catch (Exception $e) {
            Log::error("generateLotteryCode:\n" . $e->getMessage());
        }
    }

    private function random_string($length): string
    {
        try {
            $str = random_bytes($length);
            $str = base64_encode($str);
            $str = str_replace(["+", "/", "="], "", $str);
            $str = substr($str, 0, $length);

            return $str;
        } catch (Exception $e) {
            Log::error("random_string:\n" . $e->getMessage());
        }
    }
}
