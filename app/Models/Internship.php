<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    //
    protected $fillable = [
        'name',
        'company_name',
        'description',
        'languages',
        'frameworks',
        'location',
        'user_id',
        'gpa_requirement',
        'salary',
        'no_of_students',
        'start_date',
        'end_date',

    ];
    protected $casts = [
        'gpa_requirement' => 'decimal:2'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function student_internship(){
        return $this->hasMany(StudentInternship::class);
    }
}
