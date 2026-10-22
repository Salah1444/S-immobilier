<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{
     public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Si cette adresse est enregistrée, un lien de réinitialisation sera envoyé.',
            ]);
        }

        if ($status === Password::RESET_THROTTLED) {
            return response()->json([
                'message' => 'Veuillez patienter avant de demander un nouveau lien.',
            ], 429);
        }

        // Ne pas révéler si l'adresse e-mail existe.
        return response()->json([
            'message' => 'Si cette adresse est enregistrée, un lien de réinitialisation sera envoyé.',
        ]);
    }
        public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:6','confirmed'],
        ]);

        $status = Password::reset(
            $request->only(
                'email',
                'password',
                'password_confirmation',
                'token'
            ),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Ton mot de passe a été réinitialisé avec succès.',
            ]);
        }

        throw ValidationException::withMessages([
            'email' => [
                'Le lien est invalide ou a expiré. Demande un nouveau lien.',
            ],
        ]);
    }

    
}
