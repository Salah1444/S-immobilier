<?php

namespace Database\Seeders;

use App\Models\AgencySetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgencySettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
    {
        AgencySetting::updateOrCreate(
            ['agency_name' => 'Salah Immobilier'],
            [
                'phone' => '+212600000000',
                'whatsapp' => '+212600000000',
                'email' => 'contact@salah-immobilier.test',
                'address' => 'Agadir, Maroc',
                'city_id' => 1,
                'description' => 'Votre partenaire immobilier à Agadir.',
                'logo_path' => null,
                'facebook_url' => null,
                'instagram_url' => null,
            ]
        );
    }
}
