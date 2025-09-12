<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Session::flush();
        // $bottom = User::find(1)->descendants()->depthFirst()->isLeaf()->where('depth', '>', 16)->get(['id', 'depth']);
        // Log::info($bottom);

        return Inertia::render('Welcome');
    }
}
