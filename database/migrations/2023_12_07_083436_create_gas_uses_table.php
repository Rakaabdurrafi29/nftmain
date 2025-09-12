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
        Schema::create('gas_uses', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_type');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('wallet_id')->nullable();
            $table->decimal('gas_used', 27, 18);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gas_uses');
    }
};
