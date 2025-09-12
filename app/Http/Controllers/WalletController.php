<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class WalletController extends Controller
{
    public function getMyWalletBalance(): JsonResponse
    {
        try {
            $turnover = Wallet::where('user_id', auth()->id())
                ->sum('credit_amount');
            $withdrawal = Wallet::where('user_id', auth()->id())
                ->where('status', '<>', 'FAILED')
                ->sum('debit_amount');
            $balance = $turnover - $withdrawal;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when retrieving your turnover data!',
            ]);
        }

        return response()->json($balance);
    }

    public function getMyBonus(): JsonResponse
    {
        try {
            $bonus = Wallet::where('user_id', auth()->id())
                ->whereIn('type', ['referral', 'royalty'])
                ->sum('credit_amount');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when retrieving your bonus data!',
            ]);
        }

        return response()->json($bonus);
    }

    public function getMyReferralBonus(): JsonResponse
    {
        try {
            $bonus = Wallet::where('user_id', auth()->id())
                ->where('type', 'referral')
                ->sum('credit_amount');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when retrieving your referral bonus data!',
            ]);
        }

        return response()->json($bonus);
    }

    public function getMyRoyaltyBonus(): JsonResponse
    {
        try {
            $bonus = Wallet::where('user_id', auth()->id())
                ->where('type', 'royalty')
                ->sum('credit_amount');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when retrieving your royalty bonus data!',
            ]);
        }

        return response()->json($bonus);
    }

    public function getMyBonusList(): JsonResponse
    {
        try {
            $bonusList = Wallet::where('user_id', auth()->id())
                ->whereIn('type', ['referral', 'royalty'])
                ->with(['from_user'])
                ->orderBy('created_at', 'DESC')
                ->paginate(50);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when retrieving your bonus data!',
            ]);
        }

        return response()->json($bonusList);
    }

    public function getMyWalletList(): JsonResponse
    {
        try {
            $walletList = Wallet::where('user_id', auth()->id())
                ->with('from_user')
                ->orderBy('created_at', 'DESC')
                ->paginate(50);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when retrieving your N-Wallet data!',
            ]);
        }

        return response()->json($walletList);
    }

    public function getMyRoi(): JsonResponse
    {
        try {
            $roi = Wallet::where('user_id', auth()->id())
                ->where('type', 'roi')
                ->sum('credit_amount');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when retrieving your turnover data!',
            ]);
        }

        return response()->json($roi);
    }

    public function getMyRoiList(): JsonResponse
    {
        try {
            $bonusList = Wallet::where('user_id', auth()->id())
                ->where('type', 'roi')
                ->with('from_user')
                ->orderBy('created_at', 'DESC')
                ->paginate(50);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when retrieving your R.O.I data!',
            ]);
        }

        return response()->json($bonusList);
    }
}
