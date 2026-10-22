<?php

namespace Database\Seeders;

use App\Models\Amenity;
use App\Models\Property;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AmenityPropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
    {
        $associations = [
            ['SIM-000001', 'parking'],
            ['SIM-000002', 'piscine'],
            ['SIM-000002', 'jardin'],
        ];

        foreach ($associations as [$reference, $slug]) {
            $property = Property::where('reference', $reference)->firstOrFail();
            $amenity = Amenity::where('slug', $slug)->firstOrFail();

            DB::table('amenity_property')->updateOrInsert(
                [
                    'property_id' => $property->id,
                    'amenity_id' => $amenity->id,
                ],
                []
            );
        }
    }
}
