<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Jobs\ProcessUserActivated;
use App\Models\LotterySetting;
use App\Models\Plan;
use App\Models\Rank;
use App\Models\RankReq;
use App\Models\Roi;
use App\Models\Royalty;
use App\Models\User;
use App\Models\UserRankHistory;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        /**
         * Seed Plan master data
         */
        $plan = new Plan;
        $plan->name = 'BASIC';
        $plan->currency = 'USDT';
        $plan->price = 50;
        $plan->obtained_nft = 1;
        $plan->is_active = true;
        $plan->save();

        /**
         * Seed Rank master data
         */
        $rank = new Rank;
        $rank->name = 'Iron';
        $rank->referrals_req = 0;
        $rank->nodes_req = 0;
        $rank->is_active = true;
        $rank->save();

        $rank = new Rank;
        $rank->name = 'Bronze';
        $rank->referrals_req = 1;
        $rank->nodes_req = 1;
        $rank->is_active = true;
        $rank->save();

        $rank = new Rank;
        $rank->name = 'Silver';
        $rank->referrals_req = 2;
        $rank->nodes_req = 6;
        $rank->is_active = true;
        $rank->save();

        $rank = new Rank;
        $rank->name = 'Gold';
        $rank->referrals_req = 9;
        $rank->nodes_req = 27;
        $rank->is_active = true;
        $rank->save();

        $rank = new Rank;
        $rank->name = 'Platinum';
        $rank->referrals_req = 15;
        $rank->nodes_req = 45;
        $rank->is_active = true;
        $rank->save();

        $rank = new Rank;
        $rank->name = 'Diamond';
        $rank->referrals_req = 25;
        $rank->nodes_req = 75;
        $rank->is_active = true;
        $rank->save();

        $rank = new Rank;
        $rank->name = 'Kryptonite';
        $rank->referrals_req = 40;
        $rank->nodes_req = 120;
        $rank->is_active = true;
        $rank->save();

        /**
         * Seed Royalty master data
         */
        for ($level = 1; $level <= 60; $level++) {
            for ($rank = 1; $rank <= 7; $rank++) {
                if ($rank >= 2 && $level <= 5) {
                    $royalty = new Royalty;
                    $royalty->plan_id = 1;
                    $royalty->rank_id = $rank;
                    $royalty->level = $level;
                    $royalty->amount = 0.50;
                    $royalty->save();
                }

                if ($rank >= 3 && $level <= 10 && $level > 5) {
                    $royalty = new Royalty;
                    $royalty->plan_id = 1;
                    $royalty->rank_id = $rank;
                    $royalty->level = $level;
                    $royalty->amount = 0.50;
                    $royalty->save();
                }

                if ($rank >= 4 && $level <= 20 && $level > 10) {
                    $royalty = new Royalty;
                    $royalty->plan_id = 1;
                    $royalty->rank_id = $rank;
                    $royalty->level = $level;
                    $royalty->amount = 0.25;
                    $royalty->save();
                }

                if ($rank >= 5 && $level <= 30 && $level > 20) {
                    $royalty = new Royalty;
                    $royalty->plan_id = 1;
                    $royalty->rank_id = $rank;
                    $royalty->level = $level;
                    $royalty->amount = 0.10;
                    $royalty->save();
                }

                if ($rank >= 6 && $level <= 40 && $level > 30) {
                    $royalty = new Royalty;
                    $royalty->plan_id = 1;
                    $royalty->rank_id = $rank;
                    $royalty->level = $level;
                    $royalty->amount = 0.10;
                    $royalty->save();
                }

                if ($rank >= 7 && $level <= 60 && $level > 40) {
                    $royalty = new Royalty;
                    $royalty->plan_id = 1;
                    $royalty->rank_id = $rank;
                    $royalty->level = $level;
                    $royalty->amount = 0.10;
                    $royalty->save();
                }
            }
        }

        /**
         * Seed Lottery Setting
         */
        $lotterySetting = new LotterySetting;
        $lotterySetting->new_member = 1000;
        $lotterySetting->winners = 10;
        $lotterySetting->save();


        /**
         * Seed top users
         */
        $user = new User;
        $user->username = 'qshields';
        $user->wallet_address = '0xC69Cd7D15EeE70eecfb22800A1179B6Dc753Af61';
        $user->plan_id = 1;
        $user->plan_str = 'BASIC';
        $user->rank_id = 7;
        $user->rank_str = 'Kryptonite';
        $user->join_amount = 50;
        $user->join_discount_amount = 0;
        $user->is_discount = 0;
        $user->discount_amount = 0;
        $user->avatar = 'avatar-1.jpg';
        $user->profile_bg = 'pbg-1.jpg';
        $user->is_suspended = false;
        $user->is_banned = false;
        $user->is_lock_for_new_join = false;
        $user->is_mint = true;
        $user->mint_transaction_hash = "0xf1e13679b2b282fbcd3c3029f7daca63a4372075c531d5b3a99f35f3c98dc453";
        $user->save();

        $user = new User;
        $user->parent_id = 1;
        $user->referral_id = 1;
        $user->username = 'katlyn80';
        $user->wallet_address = '0xEC27809B5A5114Db10aFB688DcF2aBC0cCf0CaAe';
        $user->plan_id = 1;
        $user->plan_str = 'BASIC';
        $user->rank_id = 7;
        $user->rank_str = 'Kryptonite';
        $user->join_amount = 50;
        $user->join_discount_amount = 0;
        $user->is_discount = 0;
        $user->discount_amount = 0;
        $user->avatar = 'avatar-2.jpg';
        $user->profile_bg = 'pbg-2.jpg';
        $user->is_suspended = false;
        $user->is_banned = false;
        $user->is_lock_for_new_join = false;
        $user->is_mint = true;
        $user->mint_transaction_hash = "0xf1e13679b2b282fbcd3c3029f7daca63a4372075c531d5b3a99f35f3c98dc453";
        $user->save();

        $user = new User;
        $user->parent_id = 1;
        $user->referral_id = 1;
        $user->username = 'pkunde';
        $user->wallet_address = '0x7677e4d1EAF9238622bC92841eda043AEAf61308';
        $user->plan_id = 1;
        $user->plan_str = 'BASIC';
        $user->rank_id = 7;
        $user->rank_str = 'Kryptonite';
        $user->join_amount = 50;
        $user->join_discount_amount = 0;
        $user->is_discount = 0;
        $user->discount_amount = 0;
        $user->avatar = 'avatar-3.jpg';
        $user->profile_bg = 'pbg-3.jpg';
        $user->is_suspended = false;
        $user->is_banned = false;
        $user->is_lock_for_new_join = false;
        $user->is_mint = true;
        $user->mint_transaction_hash = "0xf1e13679b2b282fbcd3c3029f7daca63a4372075c531d5b3a99f35f3c98dc453";
        $user->save();

        $user = new User;
        $user->parent_id = 2;
        $user->referral_id = 2;
        $user->username = 'jules42';
        $user->wallet_address = '0xf96bF143CD94bA94b1506309030176cf8193bBE3';
        $user->plan_id = 1;
        $user->plan_str = 'BASIC';
        $user->rank_id = 7;
        $user->rank_str = 'Kryptonite';
        $user->join_amount = 50;
        $user->join_discount_amount = 0;
        $user->is_discount = 0;
        $user->discount_amount = 0;
        $user->avatar = 'avatar-4.jpg';
        $user->profile_bg = 'pbg-4.jpg';
        $user->is_suspended = false;
        $user->is_banned = false;
        $user->is_lock_for_new_join = false;
        $user->is_mint = true;
        $user->mint_transaction_hash = "0xf1e13679b2b282fbcd3c3029f7daca63a4372075c531d5b3a99f35f3c98dc453";
        $user->save();

        $user = new User;
        $user->parent_id = 2;
        $user->referral_id = 2;
        $user->username = 'simeon.zieme';
        $user->wallet_address = '0x36cd5171E4B7dE4D9c0646ADF28109AfB7dC1447';
        $user->plan_id = 1;
        $user->plan_str = 'BASIC';
        $user->rank_id = 7;
        $user->rank_str = 'Kryptonite';
        $user->join_amount = 50;
        $user->join_discount_amount = 0;
        $user->is_discount = 0;
        $user->discount_amount = 0;
        $user->avatar = 'avatar-5.jpg';
        $user->profile_bg = 'pbg-5.jpg';
        $user->is_suspended = false;
        $user->is_banned = false;
        $user->is_lock_for_new_join = false;
        $user->is_mint = true;
        $user->mint_transaction_hash = "0xf1e13679b2b282fbcd3c3029f7daca63a4372075c531d5b3a99f35f3c98dc453";
        $user->save();

        $user = new User;
        $user->parent_id = 3;
        $user->referral_id = 3;
        $user->username = 'jamaal.little';
        $user->wallet_address = '0xE20f7f23Dcd0e2f158665592c60eE137bA77628e';
        $user->plan_id = 1;
        $user->plan_str = 'BASIC';
        $user->rank_id = 7;
        $user->rank_str = 'Kryptonite';
        $user->join_amount = 50;
        $user->join_discount_amount = 0;
        $user->is_discount = 0;
        $user->discount_amount = 0;
        $user->avatar = 'avatar-6.jpg';
        $user->profile_bg = 'pbg-6.jpg';
        $user->is_suspended = false;
        $user->is_banned = false;
        $user->is_lock_for_new_join = false;
        $user->is_mint = true;
        $user->mint_transaction_hash = "0xf1e13679b2b282fbcd3c3029f7daca63a4372075c531d5b3a99f35f3c98dc453";
        $user->save();

        $user = new User;
        $user->parent_id = 3;
        $user->referral_id = 3;
        $user->username = 'savion.kuvalis';
        $user->wallet_address = '0x4396CCef507f16bB2386CBa88e8f30b4d958768a';
        $user->plan_id = 1;
        $user->plan_str = 'BASIC';
        $user->rank_id = 7;
        $user->rank_str = 'Kryptonite';
        $user->join_amount = 50;
        $user->join_discount_amount = 0;
        $user->is_discount = 0;
        $user->discount_amount = 0;
        $user->avatar = 'avatar-7.jpg';
        $user->profile_bg = 'pbg-7.jpg';
        $user->is_suspended = false;
        $user->is_banned = false;
        $user->is_lock_for_new_join = false;
        $user->is_mint = true;
        $user->mint_transaction_hash = "0xf1e13679b2b282fbcd3c3029f7daca63a4372075c531d5b3a99f35f3c98dc453";
        $user->save();

        /**
         * Seed members
         */

        User::factory()->times(3000)->create();

        foreach (User::all() as $user) {
            $a = User::inRandomOrder()->where('id', '<', $user->id)->first();
            if ($a) {
                $user->parent_id = $a->id;
                $user->referral_id = $a->id;
                $user->save();
            }

            ProcessUserActivated::dispatch($user)->onQueue('user-activated');
        }
    }
}
