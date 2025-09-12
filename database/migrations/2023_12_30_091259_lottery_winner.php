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
        Schema::dropIfExists('lottery_winners');

        Schema::create('lottery_winners', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lottery_draw_id');
            $table->unsignedBigInteger('user_id');
            $table->string('code');
            $table->decimal('amount', 27, 18);
            $table->timestamps();

            $table->unique('user_id');

            $table->foreign('lottery_draw_id')->references('id')->on('lottery_draws');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('code')->references('code')->on('lottery_codes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
