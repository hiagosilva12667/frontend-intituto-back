# Student Management API

## 📌 Overview

This API provides functionalities for managing students and their responsible users. It allows CRUD operations on both students and responsible users, using MySQL as the database.

## 📂 Project Structure

## 🛠 Setup and Installation

### 1️⃣ Prerequisites

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### 2️⃣ Clone the repository

### 3️⃣ Install dependencies

### 4️⃣ Configure environment variables

Create a `.env` file in the root directory and add the following:

### 5️⃣ Start the server

The API will be available at `http://localhost:3006`.

## 📖 API Endpoints

### 🔹 Authentication

All protected routes require a **Bearer Token** in the request header:

### 🔹 Responsible Users

| Method   | Endpoint                       | Description                     |
| -------- | ------------------------------ | ------------------------------- |
| **POST** | `/responsibles/create-account` | Register a responsible user     |
| **POST** | `/responsibles/login`          | Authenticate a responsible user |

### 🔹 Students

| Method     | Endpoint                                      | Description                                             |
| ---------- | --------------------------------------------- | ------------------------------------------------------- |
| **POST**   | `/students/create-student`                    | Create a new student (Auth required)                    |
| **GET**    | `/students`                                   | Get all students for a responsible user (Auth required) |
| **GET**    | `/students/:academic_register`                | Get a student by academic register                      |
| **PUT**    | `/students/update-student/:academic_register` | Update a student (Auth required)                        |
| **DELETE** | `/students/delete-student/:academic_register` | Delete a student (Auth required)                        |

## 🛢 Database Schema

### Responsible Users Table (`responsibles`)

| Column       | Type         | Constraints                 |
| ------------ | ------------ | --------------------------- |
| id           | INT          | PRIMARY KEY, AUTO_INCREMENT |
| name         | VARCHAR(100) | NOT NULL                    |
| email        | VARCHAR(100) | UNIQUE, NOT NULL            |
| phone_number | VARCHAR(50)  | NOT NULL                    |
| cpf          | BIGINT       | UNIQUE, NOT NULL            |
| password     | VARCHAR(100) | NOT NULL                    |

### Students Table (`students`)

| Column            | Type         | Constraints                             |
| ----------------- | ------------ | --------------------------------------- |
| id                | INT          | PRIMARY KEY, AUTO_INCREMENT             |
| name              | VARCHAR(100) | NOT NULL                                |
| email             | VARCHAR(100) | UNIQUE, NOT NULL                        |
| academic_register | BIGINT       | UNIQUE, NOT NULL                        |
| responsible_id    | INT          | FOREIGN KEY (responsibles.id), NOT NULL |
| student_cpf       | BIGINT       | NOT NULL                                |

## 🚀 Future Improvements

- Implement refresh token mechanism for authentication
- Add role-based access control (RBAC)
- Improve error handling and logging

Thank you very much, I hope I did a great job
