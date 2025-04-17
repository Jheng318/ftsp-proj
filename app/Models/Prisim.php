<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prisim extends Model
{
    //
    protected $fillable = [
        'name',
        'type',
        'description',
        'user_id',
        'gpa_requirenment',
        'no_of_students'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function allocation(){
        return $this->belongsTo(Allocation::class);
    }
}
