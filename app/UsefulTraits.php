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
    public function getRandomInternshipDates() {
        $internshipStartDates = ["2025-03-03", "2025-06-03", "2025-09-08", "2025-11-21"];
        $internshipEndDates = ["2025-08-22", "2026-02-21"];
        // Randomly pick an index from the startDates array
        $randomIndex = array_rand($internshipStartDates);
        $selectedStartDate = $internshipStartDates[$randomIndex];
        
        // Determine the end date based on the index
        if ($randomIndex == 0 || $randomIndex == 1) {
            $selectedEndDate = $internshipEndDates[0]; // "2025-08-22"
        } elseif ($randomIndex == 2 || $randomIndex == 3) {
            $selectedEndDate = $internshipEndDates[1]; // "2026-02-21"
        }
        
        // Return the selected dates as an associative array
        return [
            "startDate" => $selectedStartDate,
            "endDate" => $selectedEndDate
        ];
    }

        public function getDistance($origin, $destination) {
        //Retrieve Distance example from Google Maps API
        //Based on locations from database
        $origin = urlencode('Hillion Mall'); 
        $destination = urlencode('Singapore Changi Airport');
        
        //Put in your Google Maps API key here
        $apikey = "";
        //$apikey = "AIzaSyCFTeAbtxhudpQOyWCVxViK50_tbNJ4nr4";

        $api = file_get_contents("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=".$origin."&destinations=".$destination."&key=".$apikey);
        $data = json_decode($api);

        $distance = (int)$data->rows[0]->elements[0]->distance->value / 1000 . 'km';
        dd($distance);
    }
}
