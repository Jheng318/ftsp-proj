<?php

namespace App\Http\Controllers;

use Amrachraf6699\LaravelGeminiAi\Facades\GeminiAi;
use App\Models\Internship;
use App\Models\Prisim;
use App\Models\Student;
use App\Models\StudentInterestInternship;
use App\Models\StudentInterestPrisim;
use App\Models\StudentInternship;
use App\Models\StudentPrisim;
use App\UsefulTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;

use function PHPUnit\Framework\matches;

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
    
    public function matchStudents(Request $request){
        // type is varibale to fetch the itp or ftsp based on whether the activeTab variable
        $activeTab = $request->query('tab');
        $unallocated = null;
        $type = null;
        $interest = null;

        // the list of unallocated students for wither prism or itp
        if($activeTab == "intern"){
            $unallocated = Student::whereNotIn('id', StudentInternship::pluck('student_id'))->get();
            $type = Internship::all();
            $interest = StudentInterestInternship::whereIn('student_id', $unallocated->pluck('id'))->get();
        }
        else{
            $unallocated = Student::whereNotIn('id', StudentPrisim::pluck('student_id'))->get();
            $type = Prisim::all();
            $interest = StudentInterestPrisim::whereIn('student_id', $unallocated->pluck('id'))->get();
        }

        $prompt = "For each student, match them to the most suitable internship using the following criteria:

        1. Prioritize the internship role that best aligns with the student's interest.
        2. If multiple internships match the interest, consider the student's preferred frameworks and programming languages.
        3. Ensure the student's GPA meets the internship's GPA requirement, and consider location compatibility.

        Return only the matched results in this exact format:
        StudentId -> InternshipId

        Only return one line per student. Do not include any headings, titles, or explanations.";

        $prompt .= "Internship: " . json_encode($type, JSON_PRETTY_PRINT) . "\n";
        $prompt .= "Student's Interest: " . json_encode($interest, JSON_PRETTY_PRINT) . "\n";

        $response = GeminiAi::generateText($prompt, ["model" => "gemini-2.0-flash-lite"]);
        $matches = []; 

        $lines = array_filter(explode("\n", $response));
        foreach ($lines as $line) {
            $split = explode('->', $line);
            $matches[intval($split[0])] =  intval($split[1]);
        }
        foreach($matches as $studentId => $internshipId){
            StudentInternship::create([
                'student_id' => $studentId,
                'internship_id' => $internshipId,
            ]);
        }

    }
}   
