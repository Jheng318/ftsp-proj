<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use App\Models\Prism;
use App\Models\Student;
use App\Models\StudentInternship;
use App\Models\StudentPrism;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
    //
    public function index()
    {
        $internships = Internship::with('user')->orderBy('start_date', 'DESC')->take(3)->get()->map(
            function ($internship) {
                // Ensure the date field is a Carbon instance
                $createdAt = Carbon::parse($internship->created_at);

                return [
                    'id' => $internship->id,
                    'title' => $internship->name,
                    'description' => $internship->description,
                    'company_name' => $internship->company_name,
                    'salary' => $internship->salary,
                    'created_at' => $createdAt->diffForHumans(),
                    'user_name' => $internship->user->name, // Get the human-readable difference
                    // ... other fields
                ];
            }
        );

        $prism_projects = Prism::with('user')->orderBy('start_date', 'DESC')->take(3)->get()->map(
            function ($prism) {
                // Ensure the date field is a Carbon instance
                $createdAt = Carbon::parse($prism->created_at);

                return [
                    'id' => $prism->id,
                    'title' => $prism->name,
                    'description' => $prism->description,
                    'type' => $prism->type,
                    'created_at' => $createdAt->diffForHumans(),
                    'user_name' => $prism->user->name,
                ];
            }
        );

        $prism_check = true;
        $internship_check = true;
        $student_id = Auth::user()->student->id;

        if (!StudentInternship::where('student_id', $student_id)->exists()) {
            $internship_check = false;
        }

        if (!StudentPrism::where('student_id', $student_id)->exists()) {
            $prism_check = false;
        }
        
        if (!$prism_check && !$internship_check) {
            $allocation = [
                "allocation_status" => false
            ];
        }

        return inertia('Student/Main', compact('internships', 'prism_projects', 'allocation'));
    }
    public function intern()
    {
        return response()->json("intern page");
    }
    public function internDetail($id)
    {
        $displayInternship = Internship::find($id);
        $internships = Internship::with('user')->get();

        return inertia('Student/InternshipDetails', compact('internships', 'displayInternship'));
    }
    public function prism()
    {
        return response()->json("prism page");
    }

    public function prismDetail($id)
    {
        $displayPrism = Prism::find($id);
        $prism_projects = Internship::with('user')->get();

        return inertia('Student/PrismDetails', compact('prism_projects', 'displayPrism'));
    }
    public function allocation()
    {
        return response()->json("allocation page");
    }

    public function getStudent($id)
    {
        $student = Student::find($id);
        return response()->json($student);
    }
}
