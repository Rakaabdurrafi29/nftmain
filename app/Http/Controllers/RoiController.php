<?php

namespace App\Http\Controllers;

use App\Models\Roi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoiController extends Controller
{
    public function getMyRoiSchedule(): JsonResponse
    {
        $latestRoi = Roi::where('user_id', auth()->id())->latest('date_end')->select(['date_end'])->first();
        return response()->json($latestRoi);
    }
}
