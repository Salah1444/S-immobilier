<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AgencySetting;

class AgencyController extends Controller
{
    public function getInfo()
    {
        $agency = AgencySetting::with('city')->find(1);
        return response()->json($agency);
    }
}
