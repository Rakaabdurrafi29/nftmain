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
        Schema::create('royalties', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('plan_id');
            $table->unsignedBigInteger('rank_id');
            $table->integer('level');
            $table->decimal('amount', 3, 2);
            $table->timestamps();

            $table->foreign('plan_id')->references('id')->on('plans');
            $table->foreign('rank_id')->references('id')->on('ranks');

            $table->index(['plan_id', 'rank_id', 'level']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('royalties');
    }
};
