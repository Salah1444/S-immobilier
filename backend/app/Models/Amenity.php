<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'is_active'
    ];
    //Amenity belongToMany Property
    public function properties()
    {
      return  $this->belongsToMany(Property::class);
    }
}
