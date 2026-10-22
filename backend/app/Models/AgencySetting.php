<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgencySetting extends Model
{
    protected $fillable = [
        'agency_name',
        'logo_path',
        'phone',
        'whatsapp',
        'email',
        'address',
        'city_id',
        'description',
        'facebook_url',
        'instagram_url',
    ];
    // Agency belongs to One City
    public function city(){
       return $this->belongsTo(City::class);
    }
}
