<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    protected $fillable = [
        'property_id',
        'assigned_to',
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'status',
        'contact_preference',
    ];
    // Inquiry belongsTo Property
    public function property(){
      return  $this->belongsTo(Property::class);
    }
    //Inquiry belongsTo User
    public function user(){
      return  $this->belongsTo(User::class,'assigned_to');
    }
    

            
}
