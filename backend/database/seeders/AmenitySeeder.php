<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $amenities = [
            [
                'name' => 'Piscine',
                'slug' => 'piscine',
                'icon' => 'waves',
                'is_active' => true,
            ],
            [
                'name' => 'Parking',
                'slug' => 'parking',
                'icon' => 'car-front',
                'is_active' => true,
            ],
            [
                'name' => 'Jardin',
                'slug' => 'jardin',
                'icon' => 'trees',
                'is_active' => true,
            ],
        ];

        foreach ($amenities as $amenity) {
            Amenity::updateOrCreate(
                ['slug' => $amenity['slug']],
                $amenity
            );
        }
    }
}
