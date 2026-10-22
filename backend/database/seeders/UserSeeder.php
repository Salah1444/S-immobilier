<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin Salah Immobilier',
                'email' => 'admin@salah-immobilier.test',
                'role' => 'admin',
            ],
            [
                'name' => 'Agent Agadir',
                'email' => 'agent1@salah-immobilier.test',
                'role' => 'agent',
            ],
            [
                'name' => 'Agent Taghazout',
                'email' => 'agent2@salah-immobilier.test',
                'role' => 'agent',
            ],
        ];

        foreach ($users as $data) {
            User::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'role' => $data['role'],
                    'is_active' => true,
                    'password' => Hash::make('ChangeMe123!'),
                ]
            );
        }
    }
}
