<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            [
                'reference' => 'SIM-000001',
                'image_path' => 'properties/appartement-agadir.jpg',
                'alt_text' => 'Appartement moderne à Agadir',
            ],
            [
                'reference' => 'SIM-000002',
                'image_path' => 'properties/villa-taghazout.jpg',
                'alt_text' => 'Villa avec jardin à Taghazout',
            ],
            [
                'reference' => 'SIM-000003',
                'image_path' => 'properties/terrain-inezgane.jpg',
                'alt_text' => 'Terrain constructible à Inezgane',
            ],
        ];

        foreach ($images as $index => $data) {
            $property = Property::where(
                'reference',
                $data['reference']
            )->firstOrFail();

            PropertyImage::updateOrCreate(
                [
                    'property_id' => $property->id,
                    'image_path' => $data['image_path'],
                ],
                [
                    'alt_text' => $data['alt_text'],
                    'is_cover' => true,
                    'sort_order' => $index + 1,
                ]
            );
        }
    }
}
