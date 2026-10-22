<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(120);
        ResetPassword::createUrlUsing(
        function (User $user, string $token): string {
            return rtrim(config('app.frontend_url'), '/')
                . '/reset-password?token=' . urlencode($token)
                . '&email=' . urlencode($user->email);
        }
    );
    }
}
