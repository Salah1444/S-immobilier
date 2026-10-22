<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{

protected $fillable = [
    'user_id',
    'city_id',
    'property_type_id',
    'title',
    'slug',
    'description',
    'transaction_type',
    'rental_period',
    'price',
    'area',
    'land_area',
    'bedrooms',
    'bathrooms',
    'living_rooms',
    'floor_number',
    'total_floors',
    'address',
    'latitude',
    'longitude',
    'status',
    'is_featured',
];
    //Property belongsTo User
    public function user()
    {
       return $this->belongsTo(User::class);
    }
    //Property belongsTo City
    public function city()
    {
       return $this->belongsTo(City::class);
    }
    //Property belongsTo PropertyType
    public function propertyType()
    {
      return  $this->belongsTo(PropertyType::class);
    }


    //Property hasMany PropertyImage
    public function images()
    {
      return  $this->hasMany(PropertyImage::class);
    }
    //Property belongsToMany Amenity

    public function amenities()
    {
      return  $this->belongsToMany(Amenity::class);
    }
    //Property hasMany Inquiry
    public function inquiries()
    {
      return  $this->hasMany(Inquiry::class);
    }
}
