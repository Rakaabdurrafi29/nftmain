<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get('/sport-legend-football', function (Request $request) {
    return response()->json([
        "name" => "NFTLottery - Legends of Football",
        "description" => "⚽ **NFTLottery presents: Legends of Football**\n\nIn every era of football, there are moments that transcend the game — goals that echo through time, saves that redefine possibility, and players whose presence turns the field into a stage of legends.\n\nThis collection immortalizes those moments through **low-poly polygon artistry**, transforming iconic football heroes into timeless digital sculptures. Each NFT is a unique fusion of sports history and modern generative art, crafted from real-life legendary moments without revealing their actual likeness, but preserving the energy, motion, and soul of the game.\n\n🎯 **Why NFTLottery?**\n- Exclusive low-poly art collectibles inspired by legendary football moments\n- A vibrant community of collectors, football lovers, and art enthusiasts\n- Your NFT could also be your ticket to future NFTLottery events & rewards\n\n💎 Own the moment. Keep the legend alive.\n\nVisit **[nftlot.io](https://nftlot.io)** to explore more and join the community.\n\n---\n\n**Supply**: Limited Edition\n**Medium**: Digital Polygon Art\n**Theme**: Legendary Football Icons",
        "image" => "https://dev.nftlot.io/assets/football-legends-logo.png",
        "banner_image" => "https://dev.nftlot.io/assets/football-legends-banner.jpg",
        "external_link" => "https://dev.nftlot.io",
        "seller_fee_basis_points" => 100,
        "fee_recipient" => "0x118D7E7f602911bd0EC8C6dD67D5De3556632540",
        "social_links" => [
            "twitter" => "https://x.com/nftlottery_io",
        ]
    ]);
});