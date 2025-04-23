<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentController extends Controller
{
    //
    public function index(){
        return inertia('Student/Main');
    }
    public function intern(){
        return response()->json("intern page");
    }
    public function prisim(){
        return response()->json("prisim page");
    }
    public function allocation(){
        return response()->json("allocation page");
    }
}
