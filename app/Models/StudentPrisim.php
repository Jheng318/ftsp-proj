<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentPrisim extends Model
{
    //
    protected $fillable = [
        'student_id',
        'prisim_id'
    ];
    public function student(){
        return $this->belongsTo(Student::class);
    }
}
