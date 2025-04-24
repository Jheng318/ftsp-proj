<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class StaffController extends Controller
{
    //
    public function index(){
        return inertia('Staff/Dashboard');
    }
    public function intern(){
        // to get all the internship and get it's respective user.id and user.name 
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
    public function editIntern(Request $request, $id){
        try{
            $validated = $request->validate([
                'jobTitle' => 'required|string',
                'companyName' => 'required|string',
                'jobDesc' => 'required|string',
                'location' => 'required|string',
                'gpaRequirement' => 'required|numeric',
                'salary' => 'required|numeric', 
                'start_date' => 'required|string',
                'end_date' => 'required|string',
                'codingLang' => 'required|array',
                'othersCoding' => 'nullable|string',
                'framework' => 'required|array',
                'otherFramework' => 'nullable|string'
            ]);
            if (!$validated) return response()->json('invalid type');

            $ogInternPost = Internship::find($id);
            if(!$ogInternPost) return redirect()->route('staff.intern.index')->withErrors(['error' => 'Unable to find post to update']);

            $ogInternPost->update([
                'name' => $validated['jobTitle'],
                'company_name' => $validated['companyName'],
                'description' => $validated['jobDesc'],
                'location' => $validated['location'],
                'gpa_requirenment' => $validated['gpaRequirement'],
                'salary' => $validated['salary'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'languages' => implode(', ', $validated['codingLang']),
                'frameworks' => implode(', ', $validated['framework'])
            ]);
            return redirect()->route('staff.intern.index');
        }
        catch(ValidationException $e){
            dd($e->validator->errors());
            return back()->withErrors(['error' => 'Invalid form entry']);
        }

    }
}
