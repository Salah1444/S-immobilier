<?php

namespace Database\Seeders;

use App\Models\PropertyType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'Appartement',
                'slug' => 'appartement',
                'description' => 'Appartement à vendre ou à louer.',
                'is_active' => true,
            ],
            [
                'name' => 'Villa',
                'slug' => 'villa',
                'description' => 'Villa avec jardin ou piscine.',
                'is_active' => true,
            ],
            [
                'name' => 'Terrain',
                'slug' => 'terrain',
                'description' => 'Terrain destiné à la construction.',
                'is_active' => true,
            ],
        ];

        foreach ($types as $type) {
            PropertyType::updateOrCreate(
                ['slug' => $type['slug']],
                $type
            );
        }
    }
}
