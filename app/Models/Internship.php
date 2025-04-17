<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    //
    protected $fillable = [
        'name',
        'company_name',
        'description',
        'languages',
        'frameworks',
        'location',
        'user_id',
        'gpa_requirement',
        'salary',
        'no_of_students'

    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function allocation(){
        return $this->belongsTo(Allocation::class);
    }
}
