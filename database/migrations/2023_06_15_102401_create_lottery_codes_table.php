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
        Schema::create('lottery_codes', function (Blueprint $table) {
            $table->string('code');
            $table->unsignedBigInteger('user_id');
            $table->boolean('is_used')->default(false);
            $table->timestamps();

            $table->unique('code');

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lottery_codes');
    }
};
