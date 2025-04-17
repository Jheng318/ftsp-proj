<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentInterestInternship extends Model
{
    //
    protected $fillable = [
        'framework',
        'languages',
        'interest',
        'student_id'
    ];
    public function student(){
        return $this->belongsTo(Student::class);
    }
}
