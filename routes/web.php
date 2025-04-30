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
    // internship
    Route::get('/intern-staff', [StaffController::class, 'intern'])->name('staff.intern.index');
    Route::delete('/delete-internship/{id}', [StaffController::class , 'deleteIntern'])->name('staff.delete.intern');
    Route::get('/edit-internship/{id}', [StaffController::class, 'showEditIntern'])->name('staff.show.edit.intern');
    Route::put('/edit-internship/{id}', [StaffController::class, 'editIntern'])->name('staff.edit.intern');
    Route::inertia('/add-internship', 'Staff/AddInternship')->name('staff.show.add.intern');
    Route::post('/add-internship', [StaffController::class, 'addIntern'])->name('staff.add.intern');

    // prism
    Route::get('/prism-staff', [StaffController::class, 'prism'])->name('staff.prism.index');

    // allocation
    Route::get('/unallocated', [StaffController::class, 'unassignedAllo'])->name('staff.unassignedAllo');
    Route::get('/allocated', [StaffController::class, 'assignedAllo'])->name('staff.assignedAllo');

    // student information
    Route::get('/student-info' ,[StaffController::class , 'studentInfo'])->name('staff.studentInfo');
    Route::put('/editStudent', [StaffController::class, 'editStudent'])->name('staff.editStudent');

    // match students routes
    Route::get("/matchStudents", [StaffController::class, 'matchStudents'])->name('staff.matchStudents');
});

//Student routes
Route::middleware(['auth', 'student'])->group(function(){
    Route::get('/main',[StudentController::class , 'index'] )->name('student.main');
    Route::get('/intern-student', [StudentController::class, 'intern'])->name('student.intern.index');
    Route::get('/intern-student/{id}', [StudentController::class, 'internDetail'])->name('student.intern.internDetail');
    Route::get('/prism-student', [StudentController::class, 'prism'])->name('student.prism.index');
    Route::get('/prism-student/{id}', [StudentController::class, 'prismDetail'])->name('student.prism.prismDetail');
    Route::get('/allocation-student', [StudentController::class, 'allocation'])->name('student.allocation');

    Route::inertia('/intern-interest', 'Student/InternshipInterest')->name('student.internship.interest');
    Route::inertia('/prism-interest', 'Student/PrismInterest')->name('student.prism.interest');
    
    Route::post('/intern-interest', [StudentController::class, 'addInternshipInterest'])->name('student.add.internship.interest');
    Route::post('/prism-interest', [StudentController::class, 'addPrismInterest'])->name('student.add.prism.interest');

});