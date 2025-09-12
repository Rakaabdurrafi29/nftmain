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
        Schema::table('lottery_pots', function (Blueprint $table) {
            $table->boolean('is_draw')->default(false);
            $table->unsignedBigInteger('lottery_draw_id')->nullable();

            $table->foreign('lottery_draw_id')->references('id')->on('lottery_draws');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lottery_pots', function (Blueprint $table) {
            $table->dropColumn('is_draw');
            $table->dropColumn('lottery_draw_id');
        });
    }
};
