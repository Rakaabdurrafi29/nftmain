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
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->string('type')->comment('referral,royalty,r.o.i,lottery,withdrawal');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('from_user_id')->nullable();
            $table->decimal('debit_amount', 27, 18)->default(0);
            $table->decimal('credit_amount', 27, 18)->default(0);
            $table->string('status')->default('done');
            $table->string('tx_hash')->nullable();
            $table->string('notes')->nullable();
            $table->timestamps();

            $table->index('type');
            $table->index('user_id');
            $table->index('from_user_id');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('from_user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
