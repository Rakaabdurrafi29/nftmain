<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        $sponsor = User::firstWhere('username', $request->username);

        if ($sponsor) {
            Session::flash('error', null);
            Session::flash('success', null);
            return Inertia::render('Auth/Register', [
                'sponsor' => $sponsor->only(['username', 'referral_code'])
            ]);
        } else {
            Session::flash('success', null);
            Session::flash('error', 'Invalid URL!');
            return Inertia::render('Auth/Register');
        }
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        info($request->all());

        $request->validate([
            'sponsor' => 'required|exist:users',
            'address' => 'required|unique:users,wallet_address',
        ]);

        // $user = User::create([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->password),
        // ]);

        // event(new Registered($user));

        // Auth::login($user);

        // return redirect(RouteServiceProvider::HOME);
    }
}
