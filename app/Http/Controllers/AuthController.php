<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //
    public function login(Request $request){
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8|string', 
        ]);
        if(!Auth::attempt($request->only('email', 'password'))) return back()->withErrors([
            'email' => 'Invalid Email',
            'password' => 'Invalid Password'
        ]);

        $user = Auth::user();

        if($user->isStaff())
            return redirect()->route('staff.dashboard');
        elseif($user->student())
            return redirect()->route('student.main');
        else return back()->withErrors(['errors' => 'User Unknown. Please try again']);
    }
    public function logout(Request $request){

        Auth::logout();
    
        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
    
        return redirect()->route('welcome');
    }
}
