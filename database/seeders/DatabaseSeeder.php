<?php

namespace Database\Seeders;

use App\Models\Internship;
use App\Models\Prisim;
use App\Models\Student;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $faker = Faker::create();
        $john = User::create([
            'name' => 'John Doe',
            'email' => '238822Y@mymail.nyp.edu.sg',
            'password' => Hash::make('Password123'),
            'contact' => '9039 4819',
            'role' => 'Student',
        ]);
        $mary = User::create([
            'name' => 'Mary Jane',
            'email' => '231234Z@mymail.nyp.edu.sg',
            'password' => Hash::make('Password123'),
            'contact' => '9238 1924',
            'role' => 'Student',
        ]);
        $staff = User::create([
            'name' => 'Mr Lim',
            'email' => 'mrlim@gmail.com',
            'password' => Hash::make('Password123'),
            'contact' => '8394 1029',
            'role' => 'Staff',
        ]);
        Student::create([
            'name' => $john->name,
            'admin_no' => '238822Y',
            'location' => $faker->city(),
            'gpa' => $faker->randomFloat(1, 0.1, 4.0),
            'resume_status' => false, 
            'user_id' => $john->id,
            'resume_name' => null,
        ]);
        Student::create([
            'name' => $mary->name,
            'admin_no' => '231234Z',
            'location' => $faker->city(),
            'gpa' => $faker->randomFloat(1, 0.1, 4.0),
            'resume_status' => false, 
            'user_id' => $mary->id,
            'resume_name' => null,
        ]);
        for($i = 0; $i < 6; $i++){
            Internship::create([
                'name' => 'Frontend Software Engineer',
                'company_name' => 'TikTok',
                'description' => 'The TikTok LIVE Platform Frontend team will focus on frontend development. We will also focus on understanding our users, identifying opportunity areas, prioritizing the problems we must solve, and rapidly creating innovative user experience solutions. We are looking for experienced engineers in the front-end field to build excellent products.
                                    We are looking for talented individuals to join us for an internship in 2025. Internships at TikTok aim to offer students industry exposure and hands-on experience. Watch your ambitions become reality as your inspiration brings infinite opportunities at TikTok.
                                    Applications will be reviewed on a rolling basis - we encourage you to apply early.
                                    Successful candidates must be able to commit to at least 3 months long internship period.',
                'languages' => 'HTML, CSS, Javascript',
                'frameworks' => 'React, Node.js, Express.js',
                'location' => '1 Raffles Quay, #26-10, South Tower, Singapore 048583',
                'user_id' => $staff->id,
                'gpa_requirenment' => 3.50,
                'salary' => 1200,
                'no_of_students' => 2,
            ]);
        }

        Prisim::create([
            'name' => 'Todo app',
            'type' => 'web development',
            'description' => 'create a todo app in react to allow users to take down notes',
            'user_id' => $staff->id,
            'gpa_requirenment' => 2.00,
            'no_of_students' => 5,
        ]);
    }
}
