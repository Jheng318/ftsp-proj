<?php

use App\Http\Controllers\AIController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InternController;
use App\Http\Controllers\PrismController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
//use Illuminate\Support\Facades\Storage;


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
    // internship
    Route::get('/intern-staff', [InternController::class, 'intern'])->name('staff.intern.index');
    Route::delete('/delete-internship/{id}', [InternController::class , 'deleteIntern'])->name('staff.delete.intern');
    Route::get('/edit-internship/{id}', [InternController::class, 'showEditIntern'])->name('staff.show.edit.intern');
    Route::put('/edit-internship/{id}', [InternController::class, 'editIntern'])->name('staff.edit.intern');
    Route::inertia('/add-internship', 'Staff/AddInternship')->name('staff.show.add.intern');
    Route::post('/add-internship', [InternController::class, 'addIntern'])->name('staff.add.intern');

    // prism
    Route::get('/prism-staff', [PrismController::class, 'prism'])->name('staff.prism.index');
    Route::delete('/delete-prism/{id}', [PrismController::class , 'delete'])->name('staff.delete.prism');
    Route::get('/edit-prism/{id}', [PrismController::class, 'showEditPrism'])->name('staff.show.edit.prism');
    Route::put('/edit-prism/{id}', [PrismController::class, 'editPrism'])->name('staff.edit.prism');
    Route::inertia('/add-prism', 'Staff/AddPrism')->name('staff.show.add.prism');
    Route::post('/add-prism', [PrismController::class, 'addPrism'])->name('staff.add.prism');

    Route::get('/dashboard',[StaffController::class , 'index'] )->name('staff.dashboard');

    // allocation
    Route::get('/unallocated', [StaffController::class, 'unassignedAllo'])->name('staff.unassignedAllo');
    Route::get('/allocated', [StaffController::class, 'assignedAllo'])->name('staff.assignedAllo');

    // student information
    Route::get('/add-student', [StaffController::class, 'showAddStudent'])->name('staff.show.addStudents');
    Route::post('/add-student', [StaffController::class, 'addStudent'])->name('staff.addStudents');
    Route::get('/student-info' ,[StaffController::class , 'studentInfo'])->name('staff.studentInfo');
    Route::put('/editStudent', [StaffController::class, 'editStudent'])->name('staff.editStudent');
    Route::post('/bulk-addStudents', [StaffController::class, 'bulkAdd'])->name('staff.bulkAdd');

    Route::get("/matchStudents", [StaffController::class, 'matchStudents'])->name('staff.matchStudents');
    Route::get('/show-deleteAllo/{id}', [StaffController::class, 'showDeleteAllo'])->name('staff.show.deleteAllo');
    Route::get('/delete-allo/{id}', [StaffController::class, 'deleteAllo'])->name('staff.deleteAllo');
    Route::get('/show-editAllo/{id}', [StaffController::class, 'showEditAllo'])->name('staff.show.editAllo');
    Route::get('/edit-allo/{id}', [StaffController::class, 'editAllo'])->name('staff.editAllo');
});

//Student routes
Route::middleware(['auth', 'student'])->group(function(){
    Route::get('/main',[StudentController::class , 'index'] )->name('student.main');
    Route::get('/intern-student', [StudentController::class, 'intern'])->name('student.intern.index');
    Route::get('/intern-student/{id}', [StudentController::class, 'internDetail'])->name('student.intern.internDetail');
    Route::get('/prism-student', [StudentController::class, 'prism'])->name('student.prism.index');
    Route::get('/prism-student/{id}', [StudentController::class, 'prismDetail'])->name('student.prism.prismDetail');
    Route::get('/allocation-student', [StudentController::class, 'allocation'])->name('student.allocation');

    Route::get('/intern-interest', [StudentController::class, 'getInterestForm'])->name('student.internship.interest');
    Route::get('/prism-interest', [StudentController::class, 'getPrismForm'])->name('student.prism.interest');
    
    Route::post('/intern-interest', [StudentController::class, 'addInternshipInterest'])->name('student.add.internship.interest');
    Route::put('/intern-interest', [StudentController::class, 'editInternshipInterest'])->name('student.edit.internship.interest');

    Route::post('/prism-interest', [StudentController::class, 'addPrismInterest'])->name('student.add.prism.interest');
    Route::put('/prism-interest', [StudentController::class, 'editPrismInterest'])->name('student.edit.prism.interest');
});