<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentInterestPrisim extends Model
{
    //
    protected $fillable = [
        'framework',
        'languages',
        'interest_ranking',
        'student_id'
    ];
    public function student(){
        return $this->belongsTo(Student::class);
    }
}
