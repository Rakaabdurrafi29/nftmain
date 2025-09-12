<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->unsignedBigInteger('referral_id')->nullable();
            $table->string('username');
            $table->string('email')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('wallet_address');
            $table->unsignedBigInteger('plan_id');
            $table->string('plan_str');
            $table->unsignedBigInteger('rank_id');
            $table->string('rank_str');
            $table->decimal('join_amount', 27, 18);
            $table->decimal('join_discount_amount', 27, 18)->default(0);
            $table->boolean('is_discount')->default(false);
            $table->decimal('discount_amount', 27, 18)->default(0);
            $table->string('avatar');
            $table->string('profile_bg');
            $table->boolean('is_suspended')->default(false);
            $table->boolean('is_banned')->default(false);
            $table->boolean('is_lock_for_new_join')->default(false);
            $table->boolean('is_mint')->default(false);
            $table->string('mint_transaction_hash')->nullable();
            $table->integer('nft_token_id')->nullable();
            $table->timestamps();

            $table->unique('username');
            $table->unique('email');
            $table->unique('wallet_address');

            $table->foreign('parent_id')->references('id')->on('users');
            $table->foreign('referral_id')->references('id')->on('users');
            $table->foreign('plan_id')->references('id')->on('plans');
            $table->foreign('rank_id')->references('id')->on('ranks');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
