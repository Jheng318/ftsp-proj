<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    //
    public function index(){
        return inertia('Staff/Dashboard');
    }
    public function intern(){
        $internships = Internship::with(['user' => function($query){
            $query->select('name', 'id');
        }])->get();
        return inertia('Staff/Internship', compact('internships'));
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
    public function deleteIntern($id){
        $internPost = Internship::find($id);
        if(!$internPost) return back()->withErrors(['error' => "Unable to find Post"]);

        $internPost->delete();
    }
    public function showEditIntern($id){
        $internPost = Internship::find($id);
        if(!$internPost) return back()->withErrors(['error' => "Unable to find Post"]);
        return inertia('Staff/EditInternship', compact('internPost'));
    }
    public function editIntern($id){}
}
