# Learning Management System (LMS) Backend

This repository contains the backend implementation of a Learning Management System (LMS) module. 
The backend is built using **Node.js**, **Express.js**, and **MongoDB**. It supports functionalities for managing courses and enrolling users in 
courses with role-based access control (Admin/User).

---

## Features

### Admin Functionality
- **Add Course**: Create new courses.
- **Update Course**: Edit existing courses.
- **Delete Course**: Remove courses from the catalog.
- **List Courses**: View all available courses.

### User Functionality
- **Browse Courses**: View the list of all available courses.
- **Enroll in Course**: Enroll in a specific course.
- **View Enrolled Courses**: See the courses the user has enrolled in.
- **User Signup**: Register a new user.
- **User Login**: Authenticate and log in as a user.

---

## Technologies Used
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing course and user data.

---

## Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **MongoDB**
- **npm** (Node Package Manager)

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Rahulpaswan461/learning-management
cd learning-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
PORT=8000
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
```

### 4. Start the Server
```bash
npm start
```
The server will run at `http://localhost:8000`.

---

## API Endpoints

### Admin Routes
1. **Add Course**
   - **Method**: POST
   - **Endpoint**: `/api/admin/course`
   - **Body**:
     ```json
     {
       "title": "Course Title",
       "description": "Brief course overview",
       "duration": "10 hours",
       "instructor": "Instructor Name"
     }
     ```

2. **Update Course**
   - **Method**: PUT
   - **Endpoint**: `/api/admin/course/:id`
   - **Body**:
     ```json
     {
       "title": "Updated Title",
       "description": "Updated Description"
     }
     ```

3. **Delete Course**
   - **Method**: DELETE
   - **Endpoint**: `/api/admin/course/:id`

4. **Get All Courses**
   - **Method**: GET
   - **Endpoint**: `/api/course`

### User Routes
1. **Signup**
   - **Method**: POST
   - **Endpoint**: `/api/users/signup`
   - **Body**:
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "password": "securePassword",
        "role" : "admin" || "user"
     }
     ```

2. **Login**
   - **Method**: POST
   - **Endpoint**: `/api/users/login`
   - **Body**:
     ```json
     {
       "email": "john.doe@example.com",
       "password": "securePassword"
     }
     ``` 
3. **Get All Courses**
   - **Method**: GET
   - **Endpoint**: `/api/course/available`

4. **Enroll in Course**
   - **Method**: POST
   - **Endpoint**: `/api/users/enroll/:courseId`

5. **Get Enrolled Courses**
   - **Method**: GET
   - **Endpoint**: `/api/users/enrolledCourses`

---

## Folder Structure
```plaintext
learning-management/
├── controllers/         # Business logic for handling requests
├── models/              # MongoDB schemas for Course and User
├── routes/              # API route handlers
├── middleware/          # Middleware for authentication and role-based access
├── validation/          # Request validation using Joi
├── .env                 # Environment variables
├── app.js               # Application entry point
├── package.json         # Project dependencies and scripts
└── README.md            # Documentation
```

---

## Future Improvements
- Add detailed error handling and logging.
- Integrate user authentication with hashed passwords.

---

## License
This project is licensed under the MIT License.
