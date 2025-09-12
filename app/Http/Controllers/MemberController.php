<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessUserActivated;
use App\Models\User;
use App\Models\UserHashHistory;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use phpDocumentor\Reflection\Types\Boolean;

use function Pest\Laravel\call;

class MemberController extends Controller
{
    public function getNewMember($take = 10): JsonResponse
    {
        $newMembers = User::select(['id', 'username', 'avatar', 'plan_str'])
            ->where('is_suspended', false)
            ->where('is_banned', false)
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->take($take)
            ->get();

        return response()->json($newMembers);
    }

    public function getMyNetwork(): JsonResponse
    {
        return response()->json(auth()->user()->descendants()->select(['id', 'username', 'is_leader', 'email', 'avatar', 'plan_str', 'rank_id', 'rank_str', 'depth'])->paginate(50));
    }

    public function getMyAllNetwork(): JsonResponse
    {
        return response()->json(auth()->user()->descendants()->select(['avatar', 'rank_id'])->orderBy('id', 'asc')->get());
    }

    public function getMyReferral(): JsonResponse
    {
        return response()->json(auth()->user()->children()->select('avatar')->get());
    }

    public function getMyReferrer(): JsonResponse
    {
        $myReferrer = User::select(['id', 'username', 'avatar', 'plan_str', 'wallet_address'])
            ->where('id', auth()->user()->referral_id)
            ->first();

        return response()->json($myReferrer);
    }

    public function getMyNetworkCount(): JsonResponse
    {
        return response()->json(auth()->user()->descendants()->count(['id']));
    }

    public function updateUserAfterMinting(Request $request): JsonResponse
    {
        try {
            $user = User::find(auth()->id());
            $user->mint_transaction_hash = $request->hash;
            $user->save();
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when saving data!',
            ]);
        }


        return response()->json([
            'status' => 'success',
            'message' => 'Transaction Hash recorded!',
        ]);
    }

    public function activateUser(): JsonResponse
    {
        try {
            $user = User::find(auth()->id());
            $user->is_mint = 1;
            $user->save();
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when saving data!',
            ]);
        }

        ProcessUserActivated::dispatch($user)->onQueue('user-activated');

        return response()->json([
            'status' => 'success',
            'message' => 'Account activated successfully!',
        ]);
    }

    public function resetHash(): JsonResponse
    {
        try {
            $user = User::find(auth()->id());
            $old_hash = $user->mint_transaction_hash;

            $user->mint_transaction_hash = null;
            $user->save();

            $userHashHistory = new UserHashHistory;
            $userHashHistory->user_id = auth()->id();
            $userHashHistory->hash = $old_hash;
            $userHashHistory->save();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when updating data!',
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Your transaction hash has been reverted. Please make sure you have enough gas before minting your NFT.',
        ]);
    }

    public function getMyTurnover(): JsonResponse
    {
        try {
            $turnover = User::where('referral_id', auth()->id())
                ->where('id', '>', 7)
                ->sum('join_amount');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when retrieving your turnover data!',
            ]);
        }

        return response()->json($turnover);
    }

    public function getMyNetworkTurnover(): JsonResponse
    {
        try {
            $groupsIds = User::find(auth()->id())
                ->descendantsAndSelf()
                ->depthFirst()
                ->where('id', '>', 7)
                ->where('is_mint', 1)
                ->select(['id'])
                ->pluck('id')
                ->toArray();

            $turnover = User::whereIn('referral_id', $groupsIds)
                ->orWhere('id', auth()->id())
                ->where('id', '>', 7)
                ->where('is_mint', 1)
                ->sum('join_amount');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when retrieving your group turnover data!',
            ]);
        }

        return response()->json($turnover);
    }

    public function checkUsername(Request $request): JsonResponse
    {
        $userNameExist = User::where('username', $request->username)->first();
        return response()->json($userNameExist);
    }
}
