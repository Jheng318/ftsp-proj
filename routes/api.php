<?php

use App\Http\Controllers\StudentController;
use App\Models\Internship;
use Illuminate\Support\Facades\Route;

Route::get('/intern', function(){
    $all = Internship::with(['user' => function($query){
        $query->select('name', 'id');
    }])->get();
    return response()->json($all);
});

Route::get('/students/{id}', [StudentController::class, 'getStudent']);
