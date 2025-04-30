<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    //
    protected $fillable = [
        'name',
        'admin_no',
        'location',
        'gpa',
        'resume_status',
        'user_id',
        'resume_name',
        'internship_start',
        'internship_end',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function interest_internship(){
        return $this->hasOne(StudentInterestInternship::class);
    }
    public function interest_prism(){
        return $this->hasOne(StudentInterestPrism::class);
    }
    public function student_internship(){
        return $this->hasOne(StudentInternship::class);
    }
    public function student_prism(){
        return $this->hasOne(StudentPrism::class);
    }
}
