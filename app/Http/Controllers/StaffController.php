<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use App\Models\Student;
use App\Models\StudentInternship;
use App\Models\StudentPrisim;
use App\UsefulTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;

class StaffController extends Controller
{
    //
    use UsefulTraits;
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
        // it get the information about the unallocated students. The I and P stands for Internship or Prisim respectfully
        
        $unallocatedDataI = Student::whereNotIn('id', StudentInternship::pluck('student_id'))->paginate(10);
        $unallocatedDataP = Student::whereNotIn('id', StudentPrisim::pluck('student_id'))->paginate(10);

        return inertia('Staff/Unallocated', compact(['unallocatedDataI','unallocatedDataP' ]));
    }
    public function assignedAllo(){
        return response()->json("assigned allocation page");
    }
    public function studentInfo(){
        $students = Student::paginate(10);

        return inertia('Staff/StudentInfo', compact('students'));
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
            return redirect()->back()->withErrors(['error' => 'Invalid form entry']);
        }
    }
    public function addIntern(Request $request){
        try{
            $createIntern =  Internship::create([
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

    public function editStudent(Request $request){
        try{
            $validated = $request->validate([
                'name' => 'required|string',
                'adminNo' => 'required|size:7|string',
                'gpa' => 'required|numeric',
                'location' => 'required|string',
                'user_id' => 'required|integer',
            ]);

            $student = Student::with('user')->find($request->user_id);
            $student->update([
                'name' => $validated['name'],
                'admin_no' => $validated['adminNo'],
                'gpa' => $validated['gpa'],
                'location' => $validated['location'],
            ]);
            $student->user->update([
                'name' => $validated['name']
            ]);
            return Redirect::back()->with('message', 'Successfully updated the students details');
        }
        catch(ValidationException $e){
            return redirect()->back()->withErrors(['error' => json_encode($e->errors())]);
        }

    }
    
    public function matchStudents(){
        return response()->json(['message'=> 'matching students']);
    }
}   
