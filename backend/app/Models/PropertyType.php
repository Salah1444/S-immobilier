<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyType extends Model
{
    protected $fillable = [ 
        'name',
        'slug',
        'description',
        'is_active',
    ];
    public function properties(){
        return $this->hasMany(Property::class);
    }
}
