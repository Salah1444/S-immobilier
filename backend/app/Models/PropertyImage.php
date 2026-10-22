<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyImage extends Model
{
    protected $fillable = [
        'property_id',
        'image_path',
        'alt_text',
        'is_cover',
        'sort_order',
    ];
    //PropertyImage belongsTo Property
    public function property(){
        $this->belongsTo(Property::class);
    }
}
