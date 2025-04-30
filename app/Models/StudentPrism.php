<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentPrism extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'student_id',
        'prism_id'
    ];
    public function student(){
        return $this->belongsTo(Student::class);
    }
}
