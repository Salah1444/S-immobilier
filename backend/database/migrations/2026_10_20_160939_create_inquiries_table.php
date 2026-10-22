<?php

use App\Models\Property;
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
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Property::class)->constrained()->nullOnDelete();
            $table->foreignIdFor(User::class,'assigned_to')->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone',30)->nullable();
            $table->string('subject')->nullable();
            
            $table->text('message');
            $table->enum('status',['nouveau','contacté','Qualifié','clôturé'])->default('nouveau');


            $table->string('contact_preference')->nullable();

            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
