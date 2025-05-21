# ReadMe File

## About and Objectives

**SkillMap** is an internship/PRISM allocation system that leverages Gemini AI to match students based on their preferred interests. The purpose is to streamline the allocation process, reducing the manual workload for lecturers while ensuring students are placed in roles that align with their skills and career goals.

This project uses React + Laravel to run the application. Make sure to download the required software.

## Configurations for the project

download the file below and paste it in the `C:\wamp64\bin\php\<php-version>\extras\ssl` for wamp or `C:\xampp\php\extras\ssl` for xampp.

These file is **very important** as the Gemini API will not work without it.

paste the line below under the [curl] section of the php.ini in 

`C:\wamp64\bin\apache\<apache-version>\bin\php.ini` and `C:\wamp64\bin\php\<php-version>\php.ini` for wamp server. paste the same line below under the same section but at  

`C:\xampp\php\php.ini` for xampp

`curl.cainfo = "C:\wamp64\bin\php\<php-version>\extras\ssl\cacert.pem”`

[cacert.pem](attachment:cb1eaab3-6890-4955-9d5d-e82ed2e6b2f3:cacert.pem)

The Gemini API only works when we run on [localhost](http://localhost) and not on the artisan server.

Copy and paste the `.htaccess` and `index.php` from the public folder of the laravel project to the root project folder.

Remove all of the `../` in the `index.php` so that the project will run on the server.

## Downloading the Dependencies

To download the composer and node packages required, type `composer i` and `npm i` in the terminal to download all the dependencies required.

### Run the application

1. Run `php artisan migrate --seed` in the terminal for migration and seeding to database.
    1. Run `php artisan migrate:fresh --seed` to refresh the database.
2. Run `npm run dev` in the terminal to start the vite server.
3. Go to `localhost/ftsp-proj/` to access the application.

## A Students.csv file for adding students in bulk is stored in the `storage/app/private` folder

## Super Secret ENV file

[.env](attachment:365e7b79-e428-4625-b1f3-574e80263678:.env)

When Allocating the students to the internship or prism project, the program will only allocate student to the internship or prism project based on the toggle button beside the heading of the page.
