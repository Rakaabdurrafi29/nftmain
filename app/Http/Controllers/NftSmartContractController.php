<?php

namespace App\Http\Controllers;

use App\Models\NftSmartContract;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NftSmartContractController extends Controller
{
    public function getActiveAddress(): JsonResponse
    {
        $address = NftSmartContract::firstWhere('is_active', 1)?->only(['address', 'mint_price']);
        return response()->json($address);
    }
}
