<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prism extends Model
{
    //
    protected $fillable = [
        'name',
        'type',
        'description',
        'user_id',
        'gpa_requirenment',
        'no_of_students',
        'start_date',
        'end_date',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function student_prism(){
        return $this->hasMany(StudentPrism::class);
    }
}
