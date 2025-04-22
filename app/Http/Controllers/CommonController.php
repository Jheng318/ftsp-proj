<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use Illuminate\Http\Request;

class CommonController extends Controller
{
    //
    public function intern(){
        $allInternship = Internship::with(['user' => function($query){
            $query->select('name', 'id');
        }])->get();
        $internships = ['internships' => $allInternship ];
        return inertia('Internship', $internships);
    }
}
