<?php

use App\Http\Controllers\AIController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome');
Route::get('/ai', [AIController::class, 'index']);