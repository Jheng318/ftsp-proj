<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentInterestPrism extends Model
{
    //
    protected $fillable = [
        'framework',
        'languages',
        'web_dev_ranking',
        'mad_ranking',
        'rpa_ranking',
        'uiux_ranking',
        'student_id'
    ];
    public function student(){
        return $this->belongsTo(Student::class);
    }
}
