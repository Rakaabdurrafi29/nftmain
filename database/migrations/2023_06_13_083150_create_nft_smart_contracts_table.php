<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nft_smart_contracts', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->string('name');
            $table->string('chain');
            $table->string('symbol');
            $table->integer('max_supply');
            $table->integer('team_reserve');
            $table->integer('mint_price');
            $table->string('owner_address');
            $table->string('treasury_address');
            $table->integer('royalties_share');
            $table->string('royalties_address');
            $table->integer('sold')->default(0);
            $table->boolean('is_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nft_smart_contracts');
    }
};
