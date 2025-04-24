<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use App\Models\Prisim;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class StudentController extends Controller
{
    //
    public function index()
    {
        $internships = Internship::with('user')->orderBy('start_date', 'DESC')->get()->map(
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
        $prism_projects = Prisim::with('user')->orderBy('start_date', 'DESC')->get();

        return inertia('Student/Main', compact('internships', 'prism_projects'));
    }
    public function intern()
    {
        return response()->json("intern page");
    }
    public function internDetail($id)
    {
        $displayInternship = Internship::find($id);
        $internships = Internship::with('user')->orderBy('start_date', 'DESC')->get()->map(
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

        return inertia('Student/InternshipDetails', compact('internships', 'displayInternship'));
    }
    public function prisim()
    {
        return response()->json("prisim page");
    }
    public function allocation()
    {
        return response()->json("allocation page");
    }
}
