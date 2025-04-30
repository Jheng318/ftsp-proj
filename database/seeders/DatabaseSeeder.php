<?php

namespace Database\Seeders;

use App\Models\Internship;
use App\Models\Prisim;
use App\Models\Student;
use App\Models\StudentInterestInternship;
use App\Models\StudentInternship;
use App\Models\StudentPrisim;
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
        $ryan = User::create([
            'name' => "Mr Ryan",
            'email' => "ryan@gmail.com",
            'password' => Hash::make('Password123'),
            'contact' => '9381 2011',
            'role' => 'Staff'
        ]);
        $studentData = [
            ['name' => 'Sarah Tan', 'email' => '238901A@mymail.nyp.edu.sg', 'admin_no' => '238901A'],
            ['name' => 'James Lee', 'email' => '238902B@mymail.nyp.edu.sg', 'admin_no' => '238902B'],
            ['name' => 'Emma Wong', 'email' => '238903C@mymail.nyp.edu.sg', 'admin_no' => '238903C'],
            ['name' => 'Michael Chen', 'email' => '238904D@mymail.nyp.edu.sg', 'admin_no' => '238904D'],
            ['name' => 'Rachel Lim', 'email' => '238905E@mymail.nyp.edu.sg', 'admin_no' => '238905E'],
            ['name' => 'David Ng', 'email' => '238906F@mymail.nyp.edu.sg', 'admin_no' => '238906F'],
            ['name' => 'Sophie Zhang', 'email' => '238907G@mymail.nyp.edu.sg', 'admin_no' => '238907G'],
            ['name' => 'Daniel Teo', 'email' => '238908H@mymail.nyp.edu.sg', 'admin_no' => '238908H'],
            ['name' => 'Amanda Goh', 'email' => '238909I@mymail.nyp.edu.sg', 'admin_no' => '238909I'],
            ['name' => 'Ryan Koh', 'email' => '238910J@mymail.nyp.edu.sg', 'admin_no' => '238910J'],
            ['name' => 'Emily Liu', 'email' => '238911K@mymail.nyp.edu.sg', 'admin_no' => '238911K'],
            ['name' => 'Brandon Sim', 'email' => '238912L@mymail.nyp.edu.sg', 'admin_no' => '238912L'],
            ['name' => 'Jessica Yeo', 'email' => '238913M@mymail.nyp.edu.sg', 'admin_no' => '238913M'],
            ['name' => 'Kevin Ong', 'email' => '238914N@mymail.nyp.edu.sg', 'admin_no' => '238914N'],
            ['name' => 'Michelle Chua', 'email' => '238915O@mymail.nyp.edu.sg', 'admin_no' => '238915O'],
            ['name' => 'Thomas Low', 'email' => '238916P@mymail.nyp.edu.sg', 'admin_no' => '238916P'],
            ['name' => 'Grace Chan', 'email' => '238917Q@mymail.nyp.edu.sg', 'admin_no' => '238917Q'],
            ['name' => 'Alex Wu', 'email' => '238918R@mymail.nyp.edu.sg', 'admin_no' => '238918R'],
            ['name' => 'Victoria Peh', 'email' => '238919S@mymail.nyp.edu.sg', 'admin_no' => '238919S'],
            ['name' => 'Marcus Tan', 'email' => '238920T@mymail.nyp.edu.sg', 'admin_no' => '238920T'],
        ];

        foreach ($studentData as $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('Password123'),
                'contact' => $faker->numerify('#### ####'),
                'role' => 'Student',
            ]);

            Student::create([
                'name' => $data['name'],
                'admin_no' => $data['admin_no'],
                'location' => $faker->city(),
                'gpa' => $faker->randomFloat(1, 2.0, 4.0),
                'resume_status' => false,
                'user_id' => $user->id,
                'resume_name' => null,
            ]);
        }
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
            'gpa_requirement' => 3.50,
            'salary' => 1200,
            'no_of_students' => 2,
            'start_date' => '2025-09-04',
            'end_date' => '2026-03-08'
        ]);
        Internship::create([
            'name' => 'Backend Developer Intern',
            'company_name' => 'Shopee',
            'description' => 'Join our backend team to work on scalable and efficient server-side logic. You will gain experience with database design and API development.  We use cutting-edge technologies to handle high traffic and ensure system reliability.  Mentorship will be provided by senior engineers. As a Backend Developer Intern, you will also participate in code reviews, contribute to architectural decisions, and learn about DevOps practices. We are looking for someone passionate about creating robust and scalable solutions.',
            'languages' => 'Python',
            'frameworks' => 'Django, Flask',
            'location' => '8 Marina View, Asia Square Tower 1, Singapore 018960',
            'user_id' => $ryan->id,
            'gpa_requirement' => 3.75,
            'salary' => 1000,
            'no_of_students' => 1,
            'start_date' => '2025-10-18',
            'end_date' => '2026-01-20'
        ]);
        Internship::create([
            'name' => 'Data Science Intern',
            'company_name' => 'Lazada',
            'description' => 'Work with real-world data to develop machine learning models and gain insights. We offer a supportive environment for learning and growth.  You will be involved in the full data science lifecycle, from data collection to model deployment.  Projects will span various domains, including e-commerce and logistics.',
            'languages' => 'Python',
            'frameworks' => 'Pandas, NumPy, Scikit-learn',
            'location' => '51 Bras Basah Rd, #04-01, Singapore 189554',
            'user_id' => $staff->id,
            'gpa_requirement' => 3.05,
            'salary' => 800,
            'no_of_students' => 3,
            'start_date' => '2025-03-06',
            'end_date' => '2025-08-08'
        ]);
        Internship::create([
            'name' => 'Mobile App Developer Intern',
            'company_name' => 'Grab',
            'description' => 'Help us build the next generation of mobile applications. You will work on both iOS and Android platforms.  We are looking for interns who are passionate about creating user-friendly and performant mobile experiences.  You will have the opportunity to contribute to all stages of the mobile development process.',
            'languages' => 'Java, Kotlin, Swift',
            'frameworks' => 'React Native',
            'location' => '3 Media Village, #02-01, Singapore 138498',
            'user_id' => $staff->id,
            'gpa_requirement' => 3.65,
            'salary' => 1000,
            'no_of_students' => 1,
            'start_date' => '2025-04-10',
            'end_date' => '2026-06-20'
        ]);
        Internship::create([
            'name' => 'UI/UX Design Intern',
            'company_name' => 'Carousell',
            'description' => 'Design intuitive and engaging user interfaces for our web and mobile products. Collaborate with developers and product managers.  We value creativity and a strong understanding of user-centered design principles.  You will be involved in user research, wireframing, and prototyping.',
            'languages' => 'HTML, CSS, JavaScript',
            'frameworks' => 'React, Figma',
            'location' => '1 Paya Lebar Link, #08-01, Singapore 408533',
            'user_id' => $staff->id,
            'gpa_requirement' => 2.60,
            'salary' => 900,
            'no_of_students' => 3,
            'start_date' => '2024-09-02',
            'end_date' => '2025-01-28'
        ]);
        Prisim::create([
            'name' => 'Customer Segmentation Analysis',
            'type' => 'Data Science',
            'description' => 'Analyze customer data to segment customers into different groups based on their behavior and preferences.  Develop targeted marketing strategies for each segment.',
            'user_id' => $staff->id,
            'gpa_constraints' => '2.40, 2.80, 3.00, 3.20',
            'no_of_students' => 4,
            'start_date' => '2024-06-12',
            'end_date' => '2024-09-20'
        ]);
        Prisim::create([
            'name' => 'Todo App',
            'type' => 'Web Development',
            'description' => 'Create a todo app in React to allow users to take down notes.',
            'user_id' => $staff->id,
            'gpa_constraints' => '2.25, 3.30',
            'no_of_students' => 2,
            'start_date' => '2024-07-03',
            'end_date' => '2024-11-15'
        ]);
        Prisim::create([
            'name' => 'Mobile Chat Application',
            'type' => 'Web Development',
            'description' => 'Develop a real-time mobile chat application with features like direct messaging, group chats, and user presence.',
            'user_id' => $staff->id,
            'gpa_constraints' => '2.50, 3.00, 3.50',
            'no_of_students' => 3,
            'start_date' => '2025-03-02',
            'end_date' => '2025-06-01'
        ]);
        
        $internshipInterest = [
            [
                'framework' => 'React, Vuejs',
                'languages' => 'HTML, CSS, Javascript',
                'interest' => 'web developer',
                'student_id' => 17,
            ],
            [
                'framework' => 'Uipath',
                'languages' => 'Javascript, Python',
                'interest' => 'automation',
                'student_id' => 7,
            ],
            [
                'framework' => 'Flutter, React Native, SwiftUi, Kotlin',
                'languages' => 'Dart, Swift, Kotlin',
                'interest' => 'Mobile Developer',
                'student_id' => 11,
            ]
        ];
        foreach($internshipInterest as $interest){
            StudentInterestInternship::create($interest);
        }
        StudentInternship::factory()->count(5)->create();
        StudentPrisim::factory()->count(5)->create();
    }
}
