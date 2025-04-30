<?php

namespace App\Http\Controllers;

use Amrachraf6699\LaravelGeminiAi\Facades\GeminiAi;
use App\Models\Internship;
use App\Models\Prism;
use App\Models\Student;
use App\Models\StudentInterestInternship;
use App\Models\StudentInterestPrism;
use App\Models\StudentInternship;
use App\Models\StudentPrism;
use App\UsefulTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
    public function prism(){
        return response()->json("Staff prism page");
    }
    public function unassignedAllo(){
        // it get the information about the unallocated students. The I and P stands for Internship or prism respectfully
        
        $unallocatedDataI = Student::whereNotIn('id', StudentInternship::pluck('student_id'))->paginate(10);
        $unallocatedDataP = Student::whereNotIn('id', StudentPrism::pluck('student_id'))->paginate(10);

        return inertia('Staff/Unallocated', compact(['unallocatedDataI','unallocatedDataP' ]));
    }
    public function assignedAllo(){
        $allocatedIntern = StudentInternship::with(['internship', 'student'])->get();
        $allocatedPrism = StudentPrism::with(['prism', 'student'])->get();
        
        return inertia('Staff/Allocated', compact(['allocatedIntern', 'allocatedPrism']));
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
            return redirect()->back()->with('message', 'Successfully updated the students details');
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
            $prompt = "For each student, match them to the most suitable internship using the following criteria:

            1. Prioritize the internship role that best aligns with the student's interest.
            2. If multiple internships match the interest, consider the student's preferred frameworks and programming languages.
            3. Ensure the student's GPA meets the internship's GPA requirement, and consider location compatibility.
            4. Ensure the student's internship period (internship_start and internship_end) aligns with the start and end of the internship in the internship listing.
            4. Each internship can have a certain number of students, ensure that the total number of students assigned to each internship does not exceed the number of students (no_of_students) specified in the internship table.

            Return only the matched results in this exact format:
            StudentId -> InternshipId

            Only return one line per student. Do not include any headings, titles, or explanations.";
        }
        else{
            $unallocated = Student::whereNotIn('id', StudentPrism::pluck('student_id'))->get();
            $type = Prism::all();
            $interest = StudentInterestPrism::whereIn('student_id', $unallocated->pluck('id'))->get();
            $prompt = "Match each student to the most fitting Project based on these factors:

            1.  Primary consideration: Alignment between the student's stated interests and the Project's description and type.
            2.  Secondary consideration: Compatibility of the student's preferred frameworks and programming languages with the Project's technical requirements.
            3.  Tertiary consideration: The student's GPA must satisfy the Project's GPA requirements, and the number of students assigned to a project must equal the number of specified GPA constraints for that project.

            Present the results in this precise format, with one student per line:

            StudentId -> ProjectId

            Only return one line per student. Do not include any headings, titles, or explanations.";           
        }

        

        $prompt .= $activeTab == "intern" ? "Internship: ": "Prism: " . json_encode($type, JSON_PRETTY_PRINT) . "\n";
        $prompt .= "Student's Interest: " . json_encode($interest, JSON_PRETTY_PRINT) . "\n";

        $response = GeminiAi::generateText($prompt, ["model" => "gemini-2.0-flash-lite"]);
        $matches = []; 

        $lines = array_filter(explode("\n", $response));
        foreach ($lines as $line) {
            $split = explode('->', $line);
            $matches[intval($split[0])] =  intval($split[1]);
        }
        if($activeTab == "intern"){
            foreach($matches as $studentId => $interestId){
                StudentInternship::create([
                    'student_id' => $studentId,
                    'internship_id' => $interestId,
                ]);
            }
        } 
        // elseif ($activeTab == "prism"){
        //     foreach($matches as $studentId => $interestId){
        //         StudentPrism::create([
        //             'student_id' => $studentId,
        //             'prism_id' => $interestId,
        //         ]);
        //     }
        // }

    }
}   
