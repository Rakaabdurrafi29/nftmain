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
        Schema::create('lottery_pot_summaries', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date_start');
            $table->dateTime('date_end');
            $table->decimal('amount', 27, 18);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lottery_pot_summaries');
    }
};
