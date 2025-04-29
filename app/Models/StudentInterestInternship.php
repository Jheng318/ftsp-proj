<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentInterestInternship extends Model
{
    //
    use HasFactory;
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
