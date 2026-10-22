<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
    {
        $cities = [
            [
                'name' => 'Agadir',
                'slug' => 'agadir',
                'region' => 'Souss-Massa',
                
            ],
            [
                'name' => 'Taghazout',
                'slug' => 'taghazout',
                'region' => 'Souss-Massa',
               
            ],
            [
                'name' => 'Inezgane',
                'slug' => 'inezgane',
                'region' => 'Souss-Massa',
               
            ],
        ];

        foreach ($cities as $city) {
            City::updateOrCreate(
                ['slug' => $city['slug']],
                $city
            );
        }
    }

}
