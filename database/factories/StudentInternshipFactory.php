<?php

namespace Database\Factories;

use App\Models\Internship;
use App\Models\Student;
use Faker\Factory as Faker;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentInternship>
 */
class StudentInternshipFactory extends Factory
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
            'student_id' => $faker->randomElement(Student::pluck('id')),
            'internship_id' => $faker->randomElement(Internship::pluck('id')),
        ];
    }
}
