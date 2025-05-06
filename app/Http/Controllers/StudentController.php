<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use App\Models\Prism;
use App\Models\Student;
use App\Models\StudentInterestInternship;
use App\Models\StudentInterestPrism;
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
        $internships = Internship::with('user')->orderBy('created_at', 'DESC')->take(3)->get()->map(
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
                    'date_created_at' => $internship->created_at,
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
                    'date_created_at' => $prism->created_at,
                    'user_name' => $prism->user->name,
                ];
            }
        );

        $prism_check = true;
        $internship_check = true;
        $allocation = true;
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
        } else if ($internship_check) {
            $internship_id = StudentInternship::where('student_id', $student_id)->pluck('internship_id');
            $allocatedIntern = Internship::find($internship_id)->first();

            $allocation = [
                "allocation_status" => true,
                "allocation_type" => "Internship",
                "job_title" => $allocatedIntern->name,
                "company_name" => $allocatedIntern->company_name
            ];
        } else if ($prism_check) {
            $prism_id = StudentPrism::where('student_id', $student_id)->pluck('prism_id');
            $allocatedPrism = Prism::find($prism_id)->first();

            $allocation = [
                "allocation_status" => true,
                "allocation_type" => "Prism",
                "project_title" => $allocatedPrism->name,
                "project_type" => $allocatedPrism->type
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
        $student_id = Auth::user()->student->id;
        $studentDetails = Student::where("id", $student_id)->first();

        if (StudentInternship::where("student_id", $student_id)->exists()) {
            $internship_id = StudentInternship::where("student_id", $student_id)->pluck("internship_id");
            $details = Internship::find($internship_id)->map(
                function ($internship) {
                    return [
                        "company_name" => $internship->company_name,
                        "job_title" => $internship->name,
                        "salary" => $internship->salary,
                        "location" => $internship->location,
                        "lecturer_name" => $internship->user->name,
                        "lecturer_contact" => $internship->user->contact,
                        "detail_type" => "Internship"
                    ];
                }
            )->first();

            $otherRecords = StudentInternship::where('internship_id', $internship_id)->whereNot('student_id', $student_id)->with('student')->get();
        } else {
            $prism_id = StudentPrism::where("student_id", $student_id)->pluck("prism_id");
            $details = Prism::find($prism_id)->map(
                function ($prism) {
                    return [
                        "project_name" => $prism->name,
                        "project_type" => $prism->type,
                        "lecturer_name" => $prism->user->name,
                        "lecturer_contact" => $prism->user->contact,
                        "detail_type" => "Prism",
                    ];
                }
            )->first();
            $otherRecords = StudentPrism::where('prism_id', $prism_id)->whereNot('student_id', $student_id)->with('student')->get();
        }

        return inertia('Student/AllocationDetails', compact('studentDetails', 'details', 'otherRecords'));
    }

    public function getInterestForm($id)
    {
        if (StudentInterestPrism::where("student_id", $id)->exists()) {
            $status = ["denied" => "internship"];
            return inertia('Student/AccessDenied', compact('status'));
        } else {
            $studentInterest = StudentInterestInternship::where("student_id", $id)->get();
            return inertia('Student/InternshipInterest', compact('studentInterest'));
        }
    }

    public function getPrismForm($id)
    {
        if (StudentInterestInternship::where("student_id", $id)->exists()) {
            $status = ["denied" => "PRISM"];
            return inertia('Student/AccessDenied', compact('status'));
        } else {
            $studentInterest = StudentInterestPrism::where("student_id", $id)->get();
            return inertia('Student/PrismInterest', compact('studentInterest'));
        }
    }

    /*     public function getStudent($id) {
        $student = Student::where('user_id', $id)->first();
        return response()->json($student);
    } */

    public function addInternshipInterest(Request $request)
    {

        $validated = $request->validate([
            'interests' => 'required',
            'languages' => 'required',
            'framework' => 'required'
        ]);

        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('resume', $filename, 'public'); // Store in the 'public' disk under 'uploads' folder
        }

        $languages_array = $request->languages;
        $frameworks_array = $request->framework;

        if ($request->otherLanguages !== null) {
            $new_array = explode(", ", $request->otherLanguages);
            foreach ($new_array as $item) {
                array_push($languages_array, $item);
            }
        }
        if ($request->otherFrameworks !== null) {
            $new_array = explode(", ", $request->otherFrameworks);
            foreach ($new_array as $item) {
                array_push($frameworks_array, $item);
            }
        }


        $interest = StudentInterestInternship::create([
            'framework' => implode(", ", $frameworks_array),
            'languages' => implode(", ", $languages_array),
            'interest' => $request->interests,
            'student_id' => $request->user_id
        ]);

        if ($interest) {
            return redirect()->route('student.main');
        }
    }

    public function editInternshipInterest(Request $request)
    {
        $validated = $request->validate([
            'interests' => 'required',
            'languages' => 'required',
            'framework' => 'required'
        ]);

        $languages_array = $request->languages;
        $frameworks_array = $request->framework;

        //dd($request);

        if ($request->otherLanguages !== null) {
            $trim_array = explode(", ", str_replace(' ', '', trim($request->otherLanguages, ', ')));

            foreach ($trim_array as $word) {
                if (!in_array($word, $languages_array)) {
                    array_push($languages_array, strtolower($word));
                }
            }
        }

        if ($request->otherFrameworks !== null) {
            $trim_array = explode(", ", str_replace(' ', '', trim($request->otherFrameworks, ', ')));

            foreach ($trim_array as $word) {
                if (!in_array($word, $frameworks_array)) {
                    array_push($frameworks_array, strtolower($word));
                }
            }
        }

        $originalForm = StudentInterestInternship::where("student_id", $request->user_id)->first();

        if ($originalForm) {
            $originalForm->update([
                'framework' => implode(", ", $frameworks_array),
                'languages' => implode(", ", $languages_array),
                'interest' => $request->interests,
                'student_id' => $request->user_id
            ]);
        }
        return redirect()->route('student.main');
    }
}
