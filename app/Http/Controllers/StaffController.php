<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StaffController extends Controller
{
    //
    public function index(){
        return inertia('Staff/Dashboard');
    }
    public function intern(){
        return response()->json("Staff intern page");
    }
    public function prisim(){
        return response()->json("Staff prisim page");
    }
    public function unassignedAllo(){
        return response()->json("Unassigned allocation page");
    }
    public function assignedAllo(){
        return response()->json("assigned allocation page");
    }
    public function studentInfo(){
        return response()->json('student information');
    }
}
