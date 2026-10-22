<?php

namespace Database\Seeders;

use App\Models\Inquiry;
use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InquirySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $agent = User::where('email', 'agent1@salah-immobilier.test')->firstOrFail();

        $inquiries = [
            [
                'property_reference' => 'SIM-000001',
                'name' => 'Mohamed Amrani',
                'email' => 'mohamed@example.test',
                'phone' => '0600000001',
                'subject' => 'Demande de visite',
                'message' => 'Je souhaite visiter cet appartement.',
                'status' => 'nouveau',
                'contact_preference' => 'phone',
            ],
            [
                'property_reference' => 'SIM-000002',
                'name' => 'Sara El Idrissi',
                'email' => 'sara@example.test',
                'phone' => '0600000002',
                'subject' => 'Disponibilité de la villa',
                'message' => 'La villa est-elle disponible pour une semaine ?',
                'status' => 'contacté',
                'contact_preference' => 'whatsapp',
            ],
            [
                'property_reference' => 'SIM-000003',
                'name' => 'Youssef Alaoui',
                'email' => 'youssef@example.test',
                'phone' => '0600000003',
                'subject' => 'Informations sur le terrain',
                'message' => 'Je souhaite connaître les conditions de vente.',
                'status' => 'nouveau',
                'contact_preference' => 'email',
            ],
        ];

        foreach ($inquiries as $data) {
            $property = Property::where(
                'reference',
                $data['property_reference']
            )->firstOrFail();

            Inquiry::updateOrCreate(
                [
                    'email' => $data['email'],
                    'property_id' => $property->id,
                ],
                [
                    'assigned_to' => $agent->id,
                    'name' => $data['name'],
                    'phone' => $data['phone'],
                    'subject' => $data['subject'],
                    'message' => $data['message'],
                    'status' => $data['status'],
                    'contact_preference' => $data['contact_preference'],
                ]
            );
        }
    }
}
