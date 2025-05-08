<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentInternship extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'student_id',
        'internship_id'
    ];
    public function student(){
        return $this->belongsTo(Student::class);
    }
    public function internship(){
        return $this->belongsTo(Internship::class);
    }
}
