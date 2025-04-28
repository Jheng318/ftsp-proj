<?php

namespace App;

trait UsefulTraits
{
    //
    public function splitOthersAddtoArr(string $others, array $arr){
        $values = explode(',', $others);
        foreach($values as $value){
            $trim = trim($value);
            if($trim !== ""){
                $arr[] = $trim;
            }
        }
        
        return implode(', ', $arr);
    }
}
