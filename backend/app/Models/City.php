<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'region'
    ];
    public function properties()
    {
        return $this->hasMany(Property::class);
    }
    // City HasOne Agency
    public function agency()
    {
        return   $this->hasOne(AgencySetting::class);
    }
}
