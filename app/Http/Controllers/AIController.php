<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Amrachraf6699\LaravelGeminiAi\Facades\GeminiAi;
use Illuminate\Support\Facades\Storage;
use Spatie\PdfToText\Pdf;

class AIController extends Controller
{
    // Using additional options
    public function index(){

        $student = [
            [
                "name" => "john",
                "interest" => "web development",
                "frameworks" => ["react", "CSS", "HTML"],
                "language" => ["Javascript", "Python"],
                "gpa" => 3.7,
            ],
            [
                "name" => "jane",
                "interest" => "automation",
                "framework" => "UiPath",
                "language" => null,
                "gpa" => 3.00,
            ]
        ];
        $job = [
            [
                'job role' => 'Front-End Developer',
                'job requirement' => [
                    "gpa" => "3.5 and above",
                    "framework" => "React",
                    "language" => "Javascript"
                ],
            ],
            [
                'job role' => 'RPA automation',
                'job requirement' => [
                    "gpa" => null,
                    "framework" => "UiPath",
                    "language" => null
                ],
            ],
        ];
        $prompt = "Given the following student data and job description, match the student with the most suitable job. Just show the student and the job allocation with no explanation.\n\n";
        $prompt .= "Students: " . json_encode($student, JSON_PRETTY_PRINT) . "\n";
        $prompt .= "Job: " . json_encode($job, JSON_PRETTY_PRINT) . "\n";
        $response = GeminiAi::generateText($prompt, ["model" => "gemini-2.0-flash-lite"]);
        dd($response);
        //echo $response; // Outputs just the text
    }

    public function getDistance() {
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
