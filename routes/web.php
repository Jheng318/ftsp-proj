<?php

use App\Http\Controllers\AIController;
use App\Http\Controllers\FileController;
use Carbon\TranslatorStrongTypeInterface;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::inertia('/', 'welcome');
Route::get('/genText', [AIController::class, 'index']);
Route::get('/analyzefiles', [AIController::class, 'analyze']);
Route::inertia('/file', 'upload');
