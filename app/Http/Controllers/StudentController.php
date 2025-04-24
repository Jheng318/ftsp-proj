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

        $prism_projects = prisim::with('user')->orderBy('start_date', 'DESC')->take(3)->get()->map(
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

        return inertia('Student/Main', compact('internships', 'prism_projects'));
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
    public function prisim()
    {
        return response()->json("prisim page");
    }

    public function prismDetail($id)
    {
        $displayPrism = prisim::find($id);
        $prism_projects = Internship::with('user')->get();

        return inertia('Student/PrismDetails', compact('prism_projects', 'displayPrism'));
    }
    public function allocation()
    {
        return response()->json("allocation page");
    }
}
