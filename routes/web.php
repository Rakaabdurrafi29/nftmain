<?php

use App\Http\Controllers\Auth\Web3AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LotteryController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\NftSmartContractController;
use App\Http\Controllers\RoiController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('welcome');

Route::get('/web3-login-message/{type?}', [Web3AuthController::class, 'signMessage']);

Route::post('/web3-login-verify', [Web3AuthController::class, 'login']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Member/Dashboard');
    })->name('dashboard');

    /** NETWWORK & MEMBERS */
    Route::get('/network', function () {
        return Inertia::render('Member/Network');
    })->name('network');
    Route::get('/new-members', [MemberController::class, 'getNewMember'])->name('member.new');
    Route::get('/my-network', [MemberController::class, 'getMyNetwork'])->name('member.network');
    Route::get('/my-children', [MemberController::class, 'getMyReferral'])->name('member.referral');
    Route::get('/my-descendants', [MemberController::class, 'getMyAllNetwork'])->name('member.descendants');
    Route::get('/my-referrer', [MemberController::class, 'getMyReferrer'])->name('member.referrer');
    Route::get('/my-network-count', [MemberController::class, 'getMyNetworkCount'])->name('member.network.count');
    Route::get('/my-group-turnover', [MemberController::class, 'getMyNetworkTurnover'])->name('member.group.turnover');
    Route::get('/my-turnover', [MemberController::class, 'getMyTurnover'])->name('member.turnover');

    Route::post('/mint/{hash?}', [MemberController::class, 'updateUserAfterMinting'])->name('afterMinting');
    Route::post('/activate', [MemberController::class, 'activateUser'])->name('activateUser');
    Route::post('/reset-hash', [MemberController::class, 'resetHash'])->name('reset.hash');
    Route::get('/check-username/{username?}', [MemberController::class, 'checkUsername']);
    Route::post('/update-username', [Web3AuthController::class, 'updateUsername'])->name('update.username');

    /** WALLET & BONUS */
    Route::get('/bonus', function () {
        return Inertia::render('Member/Bonus');
    })->name('bonus');
    Route::get('/my-wallet-balance', [WalletController::class, 'getMyWalletBalance'])->name('wallet.balance');
    Route::get('/my-bonus-list', [WalletController::class, 'getMyBonusList'])->name('bonus.list');
    Route::get('/my-bonus', [WalletController::class, 'getMyBonus'])->name('bonus.balance');
    Route::get('/my-referral-bonus', [WalletController::class, 'getMyReferralBonus'])->name('bonus.referral.balance');
    Route::get('/my-royalty-bonus', [WalletController::class, 'getMyRoyaltyBonus'])->name('bonus.royalty.balance');
    Route::get('/roi', function () {
        return Inertia::render('Member/Roi');
    })->name('roi');
    Route::get('/my-roi', [WalletController::class, 'getMyRoi'])->name('my-roi');
    Route::get('/my-roi-list', [WalletController::class, 'getMyRoiList'])->name('roi.list');
    Route::get('/my-roi-schedule', [RoiController::class, 'getMyRoiSchedule'])->name('roi.schedule');
    Route::get('/wallet', function () {
        return Inertia::render('Member/Wallet');
    })->name('wallet');
    Route::get('/my-wallet-list', [WalletController::class, 'getMyWalletList'])->name('wallet.list');
    Route::post('/withdrawal', [Web3AuthController::class, 'withdrawal'])->name('withdrawal');


    /* SMART CONTRACT */
    Route::get('/smartcontract', [NftSmartContractController::class, 'getActiveAddress'])->name('smart_contract.get_active_address');

    /** LOTTERY */
    Route::get('/lottery', function () {
        return Inertia::render('Member/Lottery');
    })->name('lottery');
    Route::get('/lottery-pot', [LotteryController::class, 'getLotteryPot'])->name('lottery.pot');
    Route::get('/lottery-pot-schedule', [LotteryController::class, 'getLotteryPotSchedule'])->name('lottery.pot.schedule');
    Route::get('/lottery-pot-previous', [LotteryController::class, 'getTotalPreviousPot'])->name('lottery.pot.previous');
    Route::get('/lottery-code', [LotteryController::class, 'getLotteryCodeList'])->name('lottery.code');
});

require __DIR__ . '/auth.php';
