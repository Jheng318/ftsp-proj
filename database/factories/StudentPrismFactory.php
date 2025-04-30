<?php

namespace Database\Factories;

use App\Models\Prism;
use App\Models\Student;
use Faker\Factory as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Studentprism>
 */
class StudentprismFactory extends Factory
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
            'prism_id' => $faker->randomElement(Prism::pluck('id')),
        ];
    }
}
