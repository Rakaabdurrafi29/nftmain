<?php

namespace App\Jobs;

use App\Models\LotteryCode;
use App\Models\LotteryDraw;
use App\Models\LotteryPot;
use App\Models\LotteryPotSummary;
use App\Models\LotterySetting;
use App\Models\Rank;
use App\Models\Roi;
use App\Models\Royalty;
use App\Models\User;
use App\Models\UserRankHistory;
use App\Models\Wallet;
use Carbon\Carbon;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Lottery;

class ProcessUserActivated implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public User $user,
    ) {
        $this->user = $user;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->setRoiData($this->user);
        $this->sendReferralBonus($this->user);
        $this->sendLotteryCode($this->user);
        $this->fillLotteryPot($this->user);
        $this->sendRoyaltyBonus($this->user);
        $this->updateUserRank($this->user);
    }

    private function setRoiData($user): void
    {
        try {
            $roi = Roi::firstWhere('user_id', $user->id);

            /**
             * R.O.I from self.
             * If this user is NOT a free account, add R.O.I schedule
             * start from tomorrow (for 30 days).
             */
            if (!$roi && $user->join_amount > 0) {
                $roiData = new Roi;
                $roiData->user_id = $user->id;
                $roiData->from_user_id = $user->id;
                $roiData->date_start = Carbon::tomorrow();
                $roiData->date_end = Carbon::tomorrow()->addDays(29)->endOfDay();
                $roiData->save();
            }
        } catch (Exception $e) {
            Log::error("setRoiData - From Self:\n" . $e->getMessage());
        }

        try {
            $roiReferral = Roi::firstWhere('user_id', $user->referral_id);

            /**
             * R.O.I from referral (network).
             * If this user has a referrer & referrer ID is not null.
             * Additional condition: the referrer is NOT a Free Account
             */
            // if ($roiReferral && $user->referral_id !== null && $roiReferral->join_amount > 0) {
            if ($roiReferral && $user->referral_id !== null) {
                // Free account receive R.O.I from referrals
                // results of discussions and agreements on Dec 31, 2023

                $old_roi = Roi::where('user_id', $user->referral_id)->orderBy('date_end', 'DESC')->first();

                /**
                 * If there are previous R.O.I schedule data, add schedule next day 
                 * of end of day of previous schedule.
                 * If there are no previous R.O.I schedule data, add new schedule
                 * start from tomorrow (for 30 days).
                 */
                if ($old_roi) {
                    $new_start = Carbon::parse($old_roi->date_end)->addDay()->startOfDay();
                    $new_end = Carbon::parse($old_roi->date_end)->addDays(29)->endOfDay();
                } else {
                    $new_start = Carbon::tomorrow()->startOfDay();
                    $new_end = Carbon::tomorrow()->addDays(29)->endOfDay();
                }

                $roiData = new Roi;
                $roiData->user_id = $user->referral_id;
                $roiData->from_user_id = $user->id;
                $roiData->date_start = $new_start;
                $roiData->date_end = $new_end;
                $roiData->save();
            }
        } catch (Exception $e) {
            Log::error("setRoiData - From Network:\n" . $e->getMessage());
        }
    }

    private function sendReferralBonus($user): void
    {
        try {
            /**
             * Send Referral Bonus (10% of Join Amount) to the referrer.
             * Free account NOT sending bonus to it's referrer.
             */
            if ($user->referral_id !== null && $user->join_amount > 0) {
                $bonusAmount = ($user->join_amount) * 10 / 100;
                $wallet = new Wallet;
                $wallet->type = "referral";
                $wallet->user_id = $user->referral_id;
                $wallet->from_user_id = $user->id;
                $wallet->debit_amount = 0;
                $wallet->credit_amount = $bonusAmount;
                $wallet->save();
            }
        } catch (Exception $e) {
            Log::error("sendReferralBonus:\n" . $e->getMessage());
        }
    }

    private function sendRoyaltyBonus($user): void
    {
        try {
            /**
             * If this user is NOT free account, send royalty bonus
             * to all ancestors with percentages according to
             * ancestor's rank and level.
             */
            if ($user->join_amount > 0) {
                $parents = User::find($user->id)->ancestors()->select(['id', 'rank_id', 'plan_id', 'is_suspended', 'is_banned', 'is_lock_for_new_join', 'is_mint', 'depth', 'path'])->depthFirst()->get();

                foreach ($parents as $parent) {
                    $royalty = Royalty::firstWhere([['plan_id', $parent->plan_id], ['rank_id', $parent->rank_id], ['level', abs($parent->depth)]]);

                    (!$royalty) ? $percentRoyalty = 0 : $percentRoyalty = $royalty->amount;

                    if ($percentRoyalty > 0 && $parent->is_suspended === 0 && $parent->is_banned === 0) {
                        $amount = $user->join_amount * $percentRoyalty / 100;

                        $wallet = new Wallet;
                        $wallet->type = "royalty";
                        $wallet->user_id = $parent->id;
                        $wallet->from_user_id = $user->id;
                        $wallet->debit_amount = 0;
                        $wallet->credit_amount = $amount;
                        $wallet->save();
                    }
                }
            }
        } catch (Exception $e) {
            Log::error("sendRoyaltyBonus:\n" . $e->getMessage());
        }
    }

    private function fillLotteryPot($user): void
    {
        try {
            /**
             * If this user is NOT free account, send 5% of Join Amount
             * to lottery pot.
             */
            if ($user->join_amount > 0) {
                $potAmount = ($user->join_amount) * 5 / 100;

                $lotteryPot = new LotteryPot;
                $lotteryPot->user_id = $user->id;
                $lotteryPot->amount = $potAmount;
                $lotteryPot->save();

                $settings = LotterySetting::first();
                $potCount = LotteryPot::where('is_draw', 0)->count();
                $potSum = LotteryPot::where('is_draw', 0)->sum('amount');

                if ($potCount === $settings->new_member) {
                    $lotteryDraw = new LotteryDraw;
                    $lotteryDraw->draw_date = Carbon::today()->addDays(3)->startOfDay();
                    $lotteryDraw->draw_amount = $potSum;
                    $lotteryDraw->winners = $settings->winners;
                    $lotteryDraw->save();

                    try {
                        LotteryPot::where('is_draw', 0)->update(['is_draw' => 1, 'lottery_draw_id' => $lotteryDraw->id]);
                    } catch (Exception $e) {
                        Log::info($e->getMessage());
                    }
                }
            }
        } catch (Exception $e) {
            Log::error("fillLotteryPot:\n" . $e->getMessage());
        }
    }

    private function sendLotteryCode($user): void
    {
        try {
            // if ($user->id !== null && $user->join_amount > 0) {
            if ($user->id !== null) {
                // Free account receive Lottery Code
                // results of discussions and agreements on Dec 31, 2023
                $lotteryCode = new LotteryCode;
                $lotteryCode->code = $this->generateLotteryCode();
                $lotteryCode->user_id = $user->id;
                $lotteryCode->is_used = false;
                $lotteryCode->save();
            }

            $referrer = User::find($user->referral_id);

            // if ($user->referral_id !== null && $referrer->join_amount > 0) {
            if ($user->referral_id !== null && $user->join_amount > 0) {
                // Free account receive Lottery Code
                // results of discussions and agreements on Dec 31, 2023
                $lotteryCode = new LotteryCode;
                $lotteryCode->code = $this->generateLotteryCode();
                $lotteryCode->user_id = $user->referral_id;
                $lotteryCode->is_used = false;
                $lotteryCode->save();
            }
        } catch (Exception $e) {
            Log::error("sendLotteryCode:\n" . $e->getMessage());
        }
    }

    private function updateUserRank($user): void
    {
        try {
            $nodes = User::find($user->id)->ancestors()->select(['id', 'rank_id', 'plan_id', 'is_leader', 'is_suspended', 'is_banned', 'is_lock_for_new_join', 'is_mint', 'depth', 'path'])->depthFirst()->get();

            foreach ($nodes as $node) {
                if ($node->id > 11) {
                    $referrals = User::where('referral_id', $node->id)->count();
                    $nodes = User::find($node->id)->descendants()->count();

                    $rank = Rank::where('referrals_req', '<=', $referrals)
                        ->where('nodes_req', '<=', $nodes)
                        ->orderBy('id', 'desc')
                        ->first();

                    if ($node->is_leader === 1 && $rank->id > 5) {
                        $node->rank_id = $rank->id;
                        $node->rank_str = $rank->name;
                        $node->save();
                    }

                    if ($node->is_leader === 0) {
                        $node->rank_id = $rank->id;
                        $node->rank_str = $rank->name;
                        $node->save();
                    }

                    $rankHistory = UserRankHistory::where('user_id', $node->id)
                        ->where('rank_id', $rank->id)
                        ->first();

                    if (!$rankHistory) {
                        ($user->referral_id === $node->id) ? $note = "Updated on referral: " . $user->id : $note = "Updated on network growth: " . $user->id;

                        $newRank = new UserRankHistory;
                        $newRank->user_id = $node->id;
                        $newRank->rank_id = $rank->id;
                        $newRank->notes = $note;
                        $newRank->save();
                    }
                }
            };
        } catch (Exception $e) {
            Log::error("updateUserRank:\n" . $e->getMessage());
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
