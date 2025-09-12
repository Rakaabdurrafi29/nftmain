<?php

namespace App\Http\Controllers;

use App\Models\LotteryCode;
use App\Models\LotteryDraw;
use App\Models\LotteryPot;
use App\Models\LotteryPotSummary;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class LotteryController extends Controller
{
    public function getLotteryPot(): JsonResponse
    {
        try {
            // $lotteryPot = LotteryPotSummary::whereDate('date_start', '<=', Carbon::now())
            //     ->whereDate('date_end', '>=', Carbon::now())
            //     ->pluck('amount');
            $lotteryPot = LotteryPot::where('is_draw', 0)->sum('amount');
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }

        return response()->json($lotteryPot);
    }

    public function getLotteryPotSchedule(): JsonResponse
    {
        try {
            // $lotteryPot = LotteryPotSummary::whereDate('date_start', '<=', Carbon::now())
            //     ->whereDate('date_end', '>=', Carbon::now())
            //     ->first();
            $lotteryPot = LotteryPot::where('is_draw', 0)->sum('amount');
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }

        return response()->json($lotteryPot);
    }

    public function getTotalPreviousPot(): JsonResponse
    {
        try {
            // $lotteryPot = LotteryPotSummary::whereDate('date_start', '<', Carbon::now()->startOfMonth())
            //     ->sum('amount');
            $lotteryPot = LotteryDraw::where('draw_date', '<', Carbon::today())->sum('draw_amount');
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }

        return response()->json($lotteryPot);
    }

    public function getLotteryCodeList(): JsonResponse
    {
        try {
            $lotteryPot = LotteryCode::where('user_id', auth()->id())
                ->where('is_used', 0)
                ->paginate(50);
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }

        return response()->json($lotteryPot);
    }
}
