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

    // Ai routes
    Route::get('/genText', [AIController::class, 'index']);
    Route::get('/getDistance', [AIController::class, 'getDistance']);
});

// Staffs routes
Route::middleware(['auth', 'staff'])->group(function(){
    Route::get('/dashboard',[StaffController::class , 'index'] )->name('staff.dashboard');
    Route::get('/intern-staff', [StaffController::class, 'intern'])->name('staff.intern.index');
    Route::get('/prisim-staff', [StaffController::class, 'prisim'])->name('staff.prisim.index');
    Route::get('/unassigned-allocation', [StaffController::class, 'unassignedAllo'])->name('staff.unassignedAllo');
    Route::get('/assigned-allocation', [StaffController::class, 'assignedAllo'])->name('staff.assignedAllo');
    Route::get('/student-info' ,[StaffController::class , 'studentInfo'])->name('staff.studentInfo');
    Route::delete('/delete-internship/{id}', [StaffController::class , 'deleteIntern'])->name('staff.delete.intern');
    Route::get('/edit-internship/{id}', [StaffController::class, 'showEditIntern'])->name('staff.show.edit.intern');
    Route::put('/edit-internship/{id}', [StaffController::class, 'editIntern'])->name('staff.edit.intern');
});

//Student routes
Route::middleware(['auth', 'student'])->group(function(){
    Route::get('/main',[StudentController::class , 'index'] )->name('student.main');
    Route::get('/intern-student', [StudentController::class, 'intern'])->name('student.intern.index');
    Route::get('/prisim-student', [StudentController::class, 'prisim'])->name('student.prisim.index');
    Route::get('/allocation-student', [StudentController::class, 'allocation'])->name('student.allocation');
});