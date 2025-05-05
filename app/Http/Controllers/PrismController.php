<?php

namespace App\Http\Controllers;

use App\Models\Prism;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PrismController extends Controller
{
    //
    public function prism(){
        $prism = Prism::with(['user'=> function($query){
            $query->select('name', 'id');
        }])->get();
        return inertia('Staff/Prism', compact('prism'));
    }
    public function delete($id){
        try{
            $prismPost = Prism::find($id);
            if(!$prismPost) return back()->withErrors(['error' => "Unable to find Post"]);

            $prismPost->delete(); 
            return redirect()->route('staff.prism.index')->with('message', 'Prism post deleted successfully.');
        } catch(ValidationException $e){
            return redirect()->back()->withErrors(['error' => 'Invalid form entry']);
        }
        
    }
    public function showEditPrism($id){
        $prismPost = Prism::find($id);
        if(!$prismPost) return back()->withErrors(['error' => "Unable to find Post"]);
        return inertia('Staff/EditPrism', compact('prismPost'));
    }
    public function editPrism(Request $request, $id){
        $validated = $request->validate([
            'projName' => 'required|string',
            'projDesc' => 'required|string',
            'projType' => 'required|string',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
            'no_of_students' => 'required|integer',
            'gpa_constraints' => 'required|string'
        ]);
        if(!$validated) return redirect()->back()->withErrors(['error' => 'Validation Error']);
        $ogPrismPost = Prism::find($id);

        if(!$ogPrismPost) return redirect()->route('staff.prism.index')->withErrors(['error' => 'Unable to find post to update']);

        $ogPrismPost->update([
            'name' => $validated['projName'],
            'type' => $validated['projType'],
            'description' => $validated['projDesc'],
            'no_of_students' => $validated['no_of_students'],
            'gpa_constraints' => $validated['gpa_constraints'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
        ]);
        
        return redirect()->route('staff.prism.index')->with('message', 'Updated Prism posting successfully.');
    }
    public function addPrism(Request $request){
        try{
            $validated = $request->validate([
                'projName' => 'required|string',
                'projDesc' => 'required|string',
                'projType' => 'required|string',
                'start_date' => 'required|string',
                'end_date' => 'required|string',
                'no_of_students' => 'required|integer',
                'gpa_constraints' => 'required|string',
                'user_id' => 'required|integer'
            ]);

            if(!$validated) return redirect()->back()->withErrors(['error' => 'Validation Error']);

            Prism::create([
                'name' => $validated['projName'],
                'type' => $validated['projType'],
                'description' => $validated['projDesc'],
                'no_of_students' => $validated['no_of_students'],
                'gpa_constraints' => $validated['gpa_constraints'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'user_id' => $validated['user_id']
            ]);

            return redirect()->route('staff.prism.index')->with('message', 'Added Prism posting successfully.');
        }
        catch(ValidationException $e){}
    }

}
