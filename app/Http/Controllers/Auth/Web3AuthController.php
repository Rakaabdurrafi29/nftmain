<?php

namespace App\Http\Controllers\Auth;

use App\Jobs\ProcessUserWithdrawal;
use App\Models\Plan;
use App\Models\User;
use App\Models\Wallet;
use Carbon\Carbon;
use Elliptic\EC;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Response;
use kornrunner\Keccak;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class Web3AuthController
{

    public function signMessage(Request $request): string
    {
        $nonce = Str::random();
        $message = "You are about to " . $request->type . " to NFTLot.io.\nPlease Sign this message to confirm you own this wallet address.\nThis action will not cost any gas fees.\n\nNonce: " . $nonce;

        session()->put('sign_message', $message);

        return $message;
    }

    protected function verifySignature(string $message, string $signature, string $address): bool
    {
        $hash = Keccak::hash(sprintf("\x19Ethereum Signed Message:\n%s%s", strlen($message), $message), 256);
        $sign = [
            'r' => substr($signature, 2, 64),
            's' => substr($signature, 66, 64),
        ];
        $recid = ord(hex2bin(substr($signature, 130, 2))) - 27;

        if ($recid != ($recid & 1)) {
            return false;
        }

        $pubkey = (new EC('secp256k1'))->recoverPubKey($hash, $sign, $recid);
        $derived_address = '0x' . substr(Keccak::hash(substr(hex2bin($pubkey->encode('hex')), 1), 256), 24);

        if ((strpos($message, "Withdrawal") !== false || strpos($message, "username") !== false) && $derived_address !== Str::lower(auth()->user()->wallet_address)) {
            return false;
        }

        return (Str::lower($address) === $derived_address);
    }

    public function registerForm(Request $request): Response
    {
        $sponsor = User::firstWhere('username', $request->username);

        if ($sponsor) {
            Session::flash('error', null);
            Session::flash('success', null);
            return Inertia::render('Auth/Register', [
                'sponsor' => $sponsor->only(['username'])
            ]);
        } else {
            Session::flash('success', null);
            Session::flash('error', 'Invalid URL!');
            return Inertia::render('Auth/Register');
        }
    }

    public function login(Request $request): JsonResponse
    {
        $result = $this->verifySignature(session()->pull('sign_message'), $request->signature, $request->address);

        session()->forget('sign_message');

        if (!$result) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid signature. Reload the page and try again.',
            ]);
        }

        $user = User::where('wallet_address', $request->address)->first();

        if ($user) {
            if (auth()->loginUsingId($user->id)) {
                // return redirect()->route('dashboard');
                return response()->json([
                    'status' => 'success',
                    'url' => route('dashboard'),
                ]);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Authentication error!',
                ]);
            }
        }

        return response()->json([
            'status' => 'failed',
            'message' => 'You are Not Registered!',
        ]);
    }

    public function register(Request $request)
    {
        $signaturValidated = $this->verifySignature($request->message, $request->signature, $request->address);
        // $signaturValidated = false;

        session()->forget('sign_message');

        $sponsor = User::firstWhere('username', $request->sponsor);

        if (!$sponsor) {
            return response()->json([
                'status' => 'failed',
                'message' => "Invalid referral link! Please confirm to your sponsor.",
            ]);
        }

        if (!$sponsor->is_mint) {
            return response()->json([
                'status' => 'failed',
                'message' => "Your referrer account is not active yet. You can not register by non-active account.",
            ]);
        }

        ($sponsor->is_discount) ? $discount = $sponsor->discount_amount : $discount = 0;

        if (!$signaturValidated) {
            return response()->json([
                'status' => 'failed',
                'message' => "Invalid signature!\nPlease reload the page and try again.",
            ]);
        }

        $userName = $this->userNameGenerator(16);

        $data = ['username' => $userName];
        $request->merge($data);

        $request->validate([
            'sponsor' => 'required|exists:users,username',
            'address' => 'required|unique:users,wallet_address',
            'username' => 'required|unique:users,username'
        ]);

        $avatars = ['avatar-1.jpg', 'avatar-2.jpg', 'avatar-3.jpg', 'avatar-4.jpg', 'avatar-5.jpg', 'avatar-6.jpg', 'avatar-7.jpg', 'avatar-8.jpg', 'avatar-9.jpg'];
        $profileBg = ['pbg-1.jpg', 'pbg-2.jpg', 'pbg-3.jpg', 'pbg-4.jpg', 'pbg-5.jpg', 'pbg-6.jpg', 'pbg-7.jpg', 'pbg-8.jpg', 'pbg-9.jpg'];

        DB::beginTransaction();

        $timestamp = Carbon::now()->toDateTimeString();
        $plan = Plan::firstWhere("id", 1);

        try {
            $userId = DB::table('users')->insertGetId([
                'parent_id' => $sponsor->id,
                'referral_id' => $sponsor->id,
                'username' => $request->username,
                'wallet_address' => $request->address,
                'plan_id' => 1,
                'plan_str' => 'BASIC',
                'rank_id' => 1,
                'rank_str' => 'IRON',
                'join_amount' => $plan->price,
                'join_discount_amount' => $discount,
                'avatar' => $avatars[array_rand($avatars, 1)],
                'profile_bg' => $profileBg[array_rand($profileBg, 1)],
                'created_at' => $timestamp,
                'updated_at' => $timestamp,
            ]);

            DB::table('user_rank_histories')->insert([
                'user_id' => $userId,
                'rank_id' => 1,
                'notes' => 'First join',
                'created_at' => $timestamp,
                'updated_at' => $timestamp,
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => 'failed',
                'message' => "Oops!\nSomething went wrong creating your account. Please try again in a moment.\n\n" . $e->getMessage(),
            ]);
        }

        $user = User::firstWhere('id', $userId);

        Auth::login($user);

        return response()->json([
            'status' => 'success',
            'url' => route('dashboard'),
        ]);
    }

    public function withdrawal(Request $request): JsonResponse
    {
        $result = $this->verifySignature(session()->pull('sign_message'), $request->signature, $request->address);

        session()->forget('sign_message');

        if (!$result) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid signature. Make sure you are connected to the right wallet.',
            ]);
        }

        $credit = Wallet::where('user_id', auth()->id())
            ->where('status', 'done')
            ->sum('credit_amount');
        $debit = Wallet::where('user_id', auth()->id())
            ->where('status', '<>', 'failed')
            ->sum('debit_amount');
        $balance = $credit - $debit;

        if ($request->wdValue + 1 < 5) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Your withdrawal value less than minimum amount!',
            ]);
        }

        if ($request->wdValue + 1 > $balance) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Your withdrawal value exceeds your balance!',
            ]);
        }

        try {
            $wd = new Wallet;
            $wd->type = "withdrawal";
            $wd->user_id = auth()->id();
            $wd->from_user_id = null;
            $wd->debit_amount = $request->wdValue + 1;
            $wd->credit_amount = 0;
            $wd->status = "Processed";
            $wd->save();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when processing your request!',
            ]);
        }

        ProcessUserWithdrawal::dispatch($request->address, $request->wdValue, $wd->id)->onQueue('process-withdrawal');

        return response()->json([
            'status' => 'success',
            'message' => 'Your withdrawal request successfully processed!',
        ]);
    }

    public function updateUsername(Request $request): JsonResponse
    {
        $result = $this->verifySignature(session()->pull('sign_message'), $request->signature, $request->address);

        session()->forget('sign_message');

        if (!$result) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid signature. Make sure you are connected to the right wallet.',
            ]);
        }

        if (Str::length($request->newUsername) < 6) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Username length minimum 6 characters (only letters, numbers, and a dot)',
            ]);
        }

        if (preg_match('/[^A-Za-z0-9\.]/', $request->newUsername) || substr_count($request->newUsername, '.') > 1) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Username length minimum 6 characters (only letters, numbers, and a dot)',
            ]);
        }

        try {
            $user = User::find(auth()->id());
            $user->username = $request->newUsername;
            $user->save();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'status' => 'failed',
                'message' => 'Something went wrong when saving your new username data!',
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Your username updated successfully!',
        ]);
    }


    protected function userNameGenerator($length): string
    {
        return substr(sha1(time()), 0, $length);
    }
}
