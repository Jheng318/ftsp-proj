<?php

namespace Database\Factories;

use App\Models\Internship;
use App\Models\Student;
use App\Models\StudentInterestInternship;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentInterestInternship>
 */
class StudentInterestInternshipFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $faker = Faker::create();
        return [
            //
            'framework' => $faker->randomElement(Internship::pluck('frameworks')),
            'languages' => $faker->randomElement(Internship::pluck('languages')),
            'interest' => $faker->randomElement(['web development', 'automation', 'mobile development', 'UIUX']),
            'student_id' => $faker->randomElement(Student::pluck('id')),
        ];
    }
}
