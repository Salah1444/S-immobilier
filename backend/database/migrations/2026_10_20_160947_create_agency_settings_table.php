<?php

use App\Models\City;
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
        Schema::create('agency_settings', function (Blueprint $table) {
            $table->id();
            $table->string('agency_name');
            $table->string('logo_path')->nullable();
            $table->string('phone');
            $table->string('whatsapp')->nullable();
            $table->string('email');
            $table->string('address');
            $table->foreignIdFor(City::class)->constrained()->nullOnDelete();
            $table->text('description')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agency_settings');
    }
};
