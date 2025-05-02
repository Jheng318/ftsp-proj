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
        Schema::create('student_interest_prisms', function (Blueprint $table) {
            $table->id();
            $table->string('framework');
            $table->string('languages');
            $table->integer('web_dev_ranking')->nullable();
            $table->integer('mad_ranking')->nullable();
            $table->integer('rpa_ranking')->nullable();
            $table->integer('uiux_ranking')->nullable();
            $table->unsignedBigInteger('student_id');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_interest_prisms');
    }
};
