<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Allocation extends Model
{
    //
    protected $fillable = [
        'student_id',
        'internship_id',
        'prisim_id',
    ];
    public function student(){
        return $this->belongsTo(Student::class);
    }
    public function internship(){
        return $this->hasMany(Internship::class);
    }
    public function prisim(){
        return $this->hasMany(Prisim::class);
    }
}
