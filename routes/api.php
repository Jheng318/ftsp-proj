<?php

use App\Http\Controllers\StaffController;
use App\Models\Internship;
use App\Models\StudentInternship;
use App\Models\StudentPrism;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

Route::get('/intern', function(){
    $all = Internship::with(['user' => function($query){
        $query->select('name', 'id');
    }])->get();
    return response()->json($all);
});

Route::get('/download/{filename}', function ($filename) {
    $path = '/resume/' . $filename;

    if (Storage::disk('private')->exists($path)) { 
        $file = Storage::disk('private')->path($path);

        return response()->streamDownload(function () use ($file) {
            echo file_get_contents($file);
        }, $filename, ['Content-Type' => Storage::disk('private')->mimetype($path)]);

    } else {
        return response()->json(['error' => 'File not found.'], 404);
    }
})->name('download.file');

Route::get('/students/{id}', [StaffController::class, 'getStudent']);
Route::get('/studentAllocation/{id}', function($id, Request $request){
    $activeTab = $request->query('activeTab');
    if($activeTab == 'intern'){
        $data = StudentInternship::with(['student:id,name', 'internship:id,name,company_name'])->find($id);
    }else{
        $data = StudentPrism::with(['student:id,name', 'prism:id,name'])->find($id);
    }
    return response()->json($data);
});
