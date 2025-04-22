<?php

use App\Http\Controllers\AIController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommonController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;


Route::inertia('/', 'Login')->name('show.login');
Route::inertia('/login', 'Login')->name('show.login');
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Shared Student and staff's routes when they are logged in
Route::middleware(['auth'])->group(function(){
    Route::inertia('/welcome', 'Welcome')->name('welcome');
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/intern', [CommonController::class, 'intern'])->name('intern.index');

    // Ai routes
    Route::get('/genText', [AIController::class, 'index']);
    Route::get('/getDistance', [AIController::class, 'getDistance']);
});

// Staffs routes
Route::middleware(['auth', 'staff'])->group(function(){
    Route::get('/dashboard',[StaffController::class , 'index'] )->name('staff.dashboard');
});

//Student routes
Route::middleware(['auth', 'student'])->group(function(){
    Route::get('/main',[StudentController::class , 'index'] )->name('student.main');
});