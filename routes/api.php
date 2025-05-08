<?php

use App\Http\Controllers\StaffController;
use App\Models\Internship;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/intern', function(){
    $all = Internship::with(['user' => function($query){
        $query->select('name', 'id');
    }])->get();
    return response()->json($all);
});

Route::get('/download/{filename}', function ($filename) {
    $path = '/resume/' . $filename;

    if (Storage::disk('public')->exists($path)) { 
        $file = Storage::disk('public')->path($path);

        return response()->streamDownload(function () use ($file) {
            echo file_get_contents($file);
        }, $filename, ['Content-Type' => Storage::disk('public')->mimetype($path)]);

    } else {
        return response()->json(['error' => 'File not found.'], 404);
    }
})->name('download.file');

Route::get('/students/{id}', [StaffController::class, 'getStudent']);
