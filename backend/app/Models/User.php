<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;
    use HasApiTokens;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active'=>'boolean'
        ];
    }
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
    // relationships
    public function properties()
    {
        return $this->hasMany(Property::class);
    }
    public function inquiries()
    {
        return $this->hasMany(Inquiry::class, 'assigned_to');
    }
    public function city(){
        return $this->belongsTo(City::class);
    }
}
