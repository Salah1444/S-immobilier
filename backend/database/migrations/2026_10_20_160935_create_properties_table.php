<?php

use App\Models\City;
use App\Models\User;
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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignId('city_id')->constrained('cities')->cascadeOnDelete();
            $table->string('slug')->unique();
            $table->foreignId('property_type_id')->constrained('property_type')->cascadeOnDelete();
            $table->string('reference')->nullable()->unique();
            $table->string('title')->default('inconnue');
            $table->text('description');
            $table->enum('transaction_type', ['louer', 'vendre']);
            $table->enum('rental_period', ['mois', 'jour'])->nullable();
            $table->decimal('price', 12, 2);
            $table->decimal('area', 10, 2);
            $table->decimal('land_area', 10, 2)->nullable();
            $table->smallInteger('bedrooms')->nullable();
            $table->smallInteger('bathrooms')->nullable();
            $table->smallInteger('living_rooms')->nullable();
            $table->smallInteger('floor_number')->nullable();
            $table->smallInteger('total_floors')->nullable();
            $table->string('address')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            
            $table->enum('status', ['Brouillon', 'Publié', 'Loué', 'Vendu', 'Archivé']);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
