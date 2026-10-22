<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Property;
use App\Models\PropertyType;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@salah-immobilier.test')->firstOrFail();
        $agent = User::where('email', 'agent1@salah-immobilier.test')->firstOrFail();

        $agadir = City::where('slug', 'agadir')->firstOrFail();
        $taghazout = City::where('slug', 'taghazout')->firstOrFail();
        $inezgane = City::where('slug', 'inezgane')->firstOrFail();

        $appartement = PropertyType::where('slug', 'appartement')->firstOrFail();
        $villa = PropertyType::where('slug', 'villa')->firstOrFail();
        $terrain = PropertyType::where('slug', 'terrain')->firstOrFail();

        $properties = [
            [
                'reference' => 'SIM-000001',
                'title' => 'Appartement moderne à Agadir',
                'slug' => 'appartement-moderne-agadir',
                'description' => 'Appartement lumineux proche des commerces.',
                'user_id' => $admin->id,
                'city_id' => $agadir->id,
                'property_type_id' => $appartement->id,
                'transaction_type' => 'louer',
                'rental_period' => 'mois',
                'price' => 850000,
                'area' => 95,
                'land_area' => null,
                'bedrooms' => 2,
                'bathrooms' => 1,
                'living_rooms' => 1,
                'floor_number' => 2,
                'total_floors' => 4,
                'address' => 'Centre-ville, Agadir',
                'latitude' => 30.4278,
                'longitude' => -9.5981,
                'status' => 'publié',
                'is_featured' => true,
                
            ],
            [
                'reference' => 'SIM-000002',
                'title' => 'Villa avec jardin à Taghazout',
                'slug' => 'villa-jardin-taghazout',
                'description' => 'Villa spacieuse idéale pour les vacances.',
                'user_id' => $agent->id,
                'city_id' => $taghazout->id,
                'property_type_id' => $villa->id,
                'transaction_type' => 'vendre',
                'rental_period' => null,
                'price' => 1800,
                'area' => 220,
                'land_area' => 350,
                'bedrooms' => 4,
                'bathrooms' => 3,
                'living_rooms' => 2,
                'floor_number' => null,
                'total_floors' => 2,
                'address' => 'Taghazout, Agadir',
                'latitude' => 30.5450,
                'longitude' => -9.7080,
                'status' => 'publié',
                'is_featured' => true,
               
            ],
            [
                'reference' => 'SIM-000003',
                'title' => 'Terrain constructible à Inezgane',
                'slug' => 'terrain-constructible-inezgane',
                'description' => 'Terrain adapté à un projet immobilier.',
                'user_id' => $admin->id,
                'city_id' => $inezgane->id,
                'property_type_id' => $terrain->id,
                'transaction_type' => 'louer',
                'rental_period' => 'jour',
                'price' => 650000,
                'area' => 250,
                'land_area' => 250,
                'bedrooms' => null,
                'bathrooms' => null,
                'living_rooms' => null,
                'floor_number' => null,
                'total_floors' => null,
                'address' => 'Inezgane, Souss-Massa',
                'latitude' => null,
                'longitude' => null,
                'status' => 'publié',
                'is_featured' => false,
             
            ],
        ];

        foreach ($properties as $data) {
            Property::updateOrCreate(
                ['reference' => $data['reference']],
                $data
            );
        }
    }
}
