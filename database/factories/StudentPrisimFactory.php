<?php

namespace Database\Factories;

use App\Models\Prisim;
use App\Models\Student;
use Faker\Factory as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentPrisim>
 */
class StudentPrisimFactory extends Factory
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
            'prisim_id' => $faker->randomElement(Prisim::pluck('id')),
        ];
    }
}
