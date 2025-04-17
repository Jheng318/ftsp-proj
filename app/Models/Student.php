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
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function allocation(){
        return $this->hasOne(Allocation::class);
    }
    public function interest_internship(){
        return $this->hasOne(StudentInterestInternship::class);
    }
    public function interest_prisim(){
        return $this->hasOne(StudentInterestPrisim::class);
    }
}
