<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Amrachraf6699\LaravelGeminiAi\Facades\GeminiAi;

class AIController extends Controller
{
    // Using additional options
    public function index(){

        $response = GeminiAi::generateText("Tell me about black holes.");
        echo $response; // Outputs just the text

    }
}
