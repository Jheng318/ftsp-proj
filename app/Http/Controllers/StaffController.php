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
use App\Models\User;
use App\UsefulTraits;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;


class StaffController extends Controller
{
    //
    use UsefulTraits;
    public function index()
    {
        return inertia('Staff/Dashboard');
    }

    public function unassignedAllo()
    {
        // it get the information about the unallocated students. The I and P stands for Internship or prism respectfully

        $unallocatedDataI = Student::whereNotIn('id', StudentInternship::pluck('student_id'))->paginate(10);
        $unallocatedDataP = Student::whereNotIn('id', StudentPrism::pluck('student_id'))->paginate(10);

        return inertia('Staff/Unallocated', compact(['unallocatedDataI', 'unallocatedDataP']));
    }
    public function assignedAllo()
    {
        $allocatedIntern = Internship::with(['student_internship.student', 'user'])
            ->whereHas('student_internship')
            ->get();
        $allocatedPrism = Prism::with(['student_prism.student', 'user'])
            ->whereHas('student_prism')
            ->get();

        return inertia('Staff/Allocated', compact(['allocatedIntern', 'allocatedPrism']));
    }


    public function studentInfo()
    {
        $students = Student::paginate(10);

        return inertia('Staff/StudentInfo', compact('students'));
    }

    public function editStudent(Request $request)
    {
        try {
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
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors(['error' => json_encode($e->errors())]);
        }
    }

    public function matchStudents(Request $request)
    {
        // type is varibale to fetch the itp or ftsp based on whether the activeTab variable
        $activeTab = $request->query('tab');
        $unallocated = null;
        $type = null;
        $interest = null;
        try {
            // the list of unallocated students for wither prism or itp
            if ($activeTab == "intern") {
                $unallocated = Student::whereNotIn('id', StudentInternship::pluck('student_id'))->get();
                $type = Internship::all();
                $interest = StudentInterestInternship::whereIn('student_id', $unallocated->pluck('id'))->with('student')->get();
                $allocated = StudentInternship::with(['internship', 'student'])->get();
                $prompt = "For each student that is provided as 'Student's Interest', match them to the most suitable internship using the following criteria:

            1. Prioritize the internship role that best aligns with the student's interest.
            2. If multiple internships interests are similar, consider the student's preferred frameworks and programming languages.
            3. If the student fulfills both citerias in statements 1 & 2, ensure the student's GPA meets the internship's GPA requirement. For example, an internship with GPA requirement of 3.5 should only receive students with GPAs between 3.2 and 3.8 (inclusive)
            4. Ensure the student's internship period (internship_start and internship_end) aligns with the start and end of the internship in the internship listing.
            5. Match the student based on the shortest distance between the internship location and the student address.
            5. Each internship can have a certain number of students, ensure that the total number of students assigned to each internship does not exceed the number of students (no_of_students) specified in the internship table.
            6. If a student is already allocated a internship, he/she cannot be allocated to another internship.
            7. The student cannot be matched if there are students already allocated to their respective internships referencing from the given allocated internships data.

            Return only the matched results in this exact format:
            StudentId -> InternshipId
            If the student is unmatchable, return in this exact format:
            StudentId -> 0

            Only return one line per student. Do not include any headings, titles, or additional explanations in the output.";
            } else {
                $unallocated = Student::whereNotIn('id', StudentPrism::pluck('student_id'))->get();
                $type = Prism::all();
                $interest = StudentInterestPrism::whereIn('student_id', $unallocated->pluck('id'))->get();
                $allocated = StudentPrism::with(['prism', 'student'])->get();
                $prompt = "Match students that is provided as 'Student's Interest' to the most suitable project based on the following criteria:

            1.  Ranking-Based Allocation: Use 'web_dev_ranking', 'mad_ranking', 'rpa_ranking', and 'uiux_ranking' from the 'prism' table to determine project fit for each student.
            2.  Project Type Inference: Infer the project type (e.g., Web Development, Mobile App Development, RPA, UI/UX Design) from the provided frameworks and languages.
            3.  GPA Constraints: Each project has specific GPA constraints. Allocate students whose GPA falls within the given range for that project. The number of GPA values provided for a project matches the total number of students to be assigned to it.
            4.  GPA Constraint Adherence: Assign students to projects only if their GPA satisfies the project's GPA constraints. For example, a Web Development project with GPA constraints of 3.5 and 2.0 should only receive students with GPAs between 3.5 and 2.0 (inclusive).
            5.  Group Capacity Limit: Do not assign more students to a project than its specified total student capacity.
            6.  If a student is already allocated a project, he/she cannot be allocated to another project.
            7.  The student cannot be matched if there are students already allocated to their respective prisms referencing from the given allocated prisms data.

            Present the allocation results in the following format, with one student-project mapping per line:

            StudentId -> ProjectId

            Ensure each student is listed on a single line with their assigned ProjectId. Do not include any headings, titles, or additional explanations in the output.\n";
            }


            $prompt .= ($activeTab == "intern" ? "Internship: Listing" : "Prism: Listing") . json_encode($type, JSON_PRETTY_PRINT) . "\n";
            $prompt .= ($activeTab == "intern" ? "Allocated Internships" : "Allocation Prisms") . json_encode($allocated, JSON_PRETTY_PRINT) . "\n";
            $prompt .= "Student's Interest: " . json_encode($interest, JSON_PRETTY_PRINT) . "\n";

            $response = GeminiAi::generateText($prompt, ["model" => "gemini-2.0-flash-lite"]);
            $matches = [];

            $lines = array_filter(explode("\n", $response));
            foreach ($lines as $line) {
                $split = explode('->', $line);
                $matches[intval($split[0])] =  intval($split[1]);
            }

            if ($activeTab == "intern") {
                $interestIdCounts = array_count_values(array_values($matches));
                $retrievedStudentIds = [];
                $distances = [];

                foreach ($matches as $studentId => $internshipId) {
                    //if there is a duplicate of internshipId
                    if (isset($interestIdCounts[$internshipId]) && $interestIdCounts[$internshipId] > 1) {
                        $retrievedStudentIds[] = $studentId; // If so, add the studentId to our list.
                        $duplicatedInternshipId = $internshipId;
                    }
                    //for no duplicates 
                    else {
                        StudentInternship::create([
                            'student_id' => $studentId,
                            'internship_id' => $internshipId,
                        ]);
                    }
                }

                //Last resort: Assigned the student closest to the internship
                if (!empty($retrievedStudentIds)) {
                    $destination = Internship::where('id', $duplicatedInternshipId)->value('location');
                    foreach ($retrievedStudentIds as $studentId) {
                        $origin = Student::where('id', $studentId)->value('location');
                        $distance = $this->getDistance($origin, $destination);
                        $distances[$studentId] = $distance;
                    }
                }

                if (!empty($distances) && !empty($duplicatedInternshipId)) {
                    $lowestValue = min($distances);
                    $chosenStudentId = array_search($lowestValue, $distances);
                    StudentInternship::create([
                        'student_id' => $chosenStudentId,
                        'internship_id' => $duplicatedInternshipId,
                    ]);
                }

            } elseif ($activeTab == "prism") {
                foreach ($matches as $studentId => $interestId) {
                    StudentPrism::create([
                        'student_id' => $studentId,
                        'prism_id' => $interestId,
                    ]);
                }
            }
            return redirect()->route('staff.assignedAllo');
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => $e]);
        }
    }
    public function getStudent($id)
    {
        $student = Student::select('name', 'gpa', 'location', 'admin_no')->find($id);
        return response()->json($student);
    }
    public function showAddStudent()
    {
        return inertia('Staff/AddStudents');
    }
    public function addStudent(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'admin_no' => 'required|string|size:7',
                'location' => 'required|string',
                'gpa' => 'required|numeric',
                'internship_start' => 'string',
                'internship_end' => 'string'
            ]);
            $student = Student::create([
                'name' => $validated['name'],
                'admin_no' => $validated['admin_no'],
                'location' => $validated['location'],
                'gpa' => $validated['gpa'],
                'internship_start' => $validated['internship_start'],
                'internship_end' => $validated['internship_end'],
                'user_id' => null,
                'resume_name' => null,
                'resume_status' => false
            ]);
            return redirect()->route('staff.studentInfo')->with('message', 'Student Information Added Succesfully');
        } catch (ValidationException $e) {
        }
    }
    public function bulkAdd(Request $request)
    {
        try {
            $request->validate([
                'csvfile' => 'required|mimes:csv',
            ]);

            DB::beginTransaction();
            // this line is necessary ^
            $csvfile = fopen($request->file('csvfile'), 'r');
            $firstLine = true;

            while (($data = fgetcsv($csvfile, 2000, ',')) !== false) {
                if (! $firstLine) {
                    $exists = Student::where('admin_no', $data[1])->exists();
                    if (!$exists) {
                        $user = User::create([
                            'name' => $data[0],
                            'email' => $data[4],
                            'contact' => $data[5],
                            'role' => 'Student',
                            'password' => Hash::make('password'),
                        ]);
                        Student::create([
                            'name' => $data[0],
                            'admin_no' => $data[1],
                            'location' => $data[2],
                            'gpa' => $data[3],
                            'resume_status' => false,
                            'resume_name' => null,
                            'internship_start' => null,
                            'internship_end' => null,
                            'user_id' => $user->id
                        ]);
                    }
                }
                $firstLine = false;
            }
            fclose($csvfile);
            DB::commit();
            // this line is necessary ^
            return redirect()->back()->with('message', 'Successfully inserted students');
        } catch (Exception $e) {
            // if there is any error in inserting the data, the csv entries inserted will be removed 
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Fail to Import Students: ' . $e->getMessage()]);
        }
    }
    // public function showDeleteAllo(Request $request,$id ){
    //     $activeTab = $request->input('activeTab');
    //     if($activeTab == 'intern')
    //         $data = StudentInternship::with(['student', 'internship:id,name'])->whereInternshipId($id)->get();
    //     elseif($activeTab == 'prism')
    //         $data = StudentPrism::with(['student', 'prism:id,name'])->wherePrismId($id)->get();
        
    //     return inertia('Staff/DeleteAllo', compact(['data', 'activeTab']));
    // }
    // public function deleteAllo(Request $request, $id){
    //     // unable to retrieve the student_id if a delete request is used instead of a get request
    //     try{
    //         $student_id = $request->input('student_id') ;
    //         $activeTab = $request->input('activeTab');
    //         if($activeTab == 'intern')
    //             $listing = StudentInternship::whereInternshipId($id)->whereStudentId($student_id)->first(); 
    //         elseif($activeTab == 'prism')
    //             $listing = StudentPrism::wherePrismId($id)->whereStudentId($student_id)->first();
    //         $listing->delete();
    //         return redirect()->back()->with('message', 'Successfully removed student from that allocation');
    //     }
    //     catch(Exception $e){}

    // }
    // public function showEditAllo(Request $request, $id){
    //     $activeTab = $request->input('activeTab');
    //     if($activeTab == 'intern'){
    //         $data = StudentInternship::with(['student', 'internship:id,name'])->whereInternshipId($id)->get();
    //         $listing = Internship::all(); 
    //     }
    //     elseif($activeTab == 'prism'){
    //         $data = StudentPrism::with(['student', 'prism:id,name'])->wherePrismId($id)->get();
    //         $listing = Prism::all(); 
    //     }
    //     $students = Student::all();

    //     return inertia('Staff/EditAllo', compact(['data', 'listing', 'students', 'activeTab']));
    // } 
    // public function editAllo(Request $request,$id){
    //     try{
    //         $student_id = $request->input('student_id') ;
    //         $activeTab = $request->input('activeTab');
    //     }
    //     catch(Exception $e){}
    // } 
    public function showManageAllo(){
        $allocatedI = StudentInternship::with(['student:id,name,admin_no', 'internship:id,name,company_name'])->get();
        $allocatedP = StudentPrism::with(['student:id,name,admin_no', 'prism:id,name'])->get();
        $internships = Internship::select('id', 'name', 'company_name')->get();
        $prisms = Prism::select('id', 'name')->get();
        return inertia('Staff/ManageAllo', compact(['allocatedI', 'allocatedP', 'internships', 'prisms']));
    }
    public function deleteAllo($id, Request $request){
        try{
            $activeTab = $request->input('activeTab');

            if($activeTab == 'intern'){
                $listing = StudentInternship::find($id);
            } else{
                $listing = StudentPrism::find($id);
            }
            $listing->delete();

            return redirect()->back()->with('message', 'Removed student\'s allocation successfully.');
        }
        catch(Exception $e){
            return redirect()->back()->withErrors(['error', 'Unsuccessful in removing student\'s allocation.']);
        }
    }
    public function editAllo(Request $request){
        try{
            $validated = $request->validate([
                'id' => 'required|numeric',
                'internAllo' => 'nullable|numeric',
                'prismAllo' => 'nullable|numeric',
                'activeTab' => 'required|string',
            ]);
            if($validated['activeTab'] == 'intern'){
                $allocation = StudentInternship::find($validated['id']);
                $allocation->update([
                    'internship_id' => $validated['internAllo'],
                ]);
            } else{
                $allocation = StudentPrism::find($validated['id']);
                $allocation->update([
                    'prism_id' => $validated['prismAllo'],
                ]);
            }
            return redirect()->back()->with('message', 'student\'s allocation has been successful.');
        }
        catch(Exception $err){
            return redirect()->back()->withErrors(['error' => 'student\'s allocation has been unsuccessful.']);
        }
        catch(ValidationException $e){
            return redirect()->back()->withErrors(['error' => json_encode($e->errors())]);
        }
    }
}
