<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use App\UsefulTraits;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class InternController extends Controller
{
    //
    use UsefulTraits;
    
    public function intern(){
        // to get all the internship and get it's respective user.id and user.name 
        $internships = Internship::with(['user' => function($query){
            $query->select('name', 'id');
        }])->get();
        return inertia('Staff/Internship', compact('internships'));
    }

    public function deleteIntern($id){
        $internPost = Internship::find($id);
        if(!$internPost) return back()->withErrors(['error' => "Unable to find Post"]);

        $internPost->delete();
        return redirect()->route('staff.intern.index')->with('message', 'Internship deleted successfully.');
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
            return redirect()->back()->withErrors(['error' => 'Invalid form entry']);
        }
    }
    public function addIntern(Request $request){
        try{
            Internship::create([
                    'name' => $request->jobTitle,
                    'company_name' => $request->companyName,
                    'description' => $request->jobDesc,
                    'location' => $request->location,
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                    'frameworks' => $this->splitOthersAddtoArr($request->othersFramework, $request->framework),
                    'languages' => $this->splitOthersAddtoArr($request->othersCoding, $request->codingLang),
                    'user_id' => $request->user_id,
                    'gpa_requirement' => floatval($request->gpaRequirement),
                    'salary' => intval($request->salary),
                    'no_of_students'  => intval($request->no_of_students)
                ]);
                return redirect()->route('staff.intern.index'); 
        }
        catch(ValidationException $e){
            return redirect()->back()->withErrors(['error' => $e]);
        }
    }
}
