# Course Selling App Backend (console based)

This is a backend application for a course selling platform built using Node.js, Express, and MongoDB. It provides APIs for user and admin functionalities such as authentication, course management, and course purchases. This project does not include a frontend.

## Features

### User Features
- User Signup
- User Login
- View all available courses
- Purchase a course
- View purchased courses

### Admin Features
- Admin Signup
- Admin Login
- Create a course
- Delete a course
- Add course content

## Tech Stack
- **Node.js**: Backend runtime
- **Express**: Web framework 
- **MongoDB**: Database management
- **jsonwebtoken**: For authentication
- **dotenv**: For environment variable management

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/Course-Selling-App-Backend.git
    cd Course-Selling-App-Backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### User Routes
- `POST /api/users/signup`: User signup
- `POST /api/users/login`: User login
- `GET /api/users/courses`: View all courses
- `POST /api/users/courses/:courseId/purchase`: Purchase a course
- `GET /api/users/purchased-courses`: View purchased courses

### Admin Routes
- `POST /api/admin/signup`: Admin signup
- `POST /api/admin/login`: Admin login
- `POST /api/admin/courses`: Create a course
- `DELETE /api/admin/courses/:courseId`: Delete a course
- `PUT /api/admin/courses/:courseId/content`: Add course content

## Database Schemas

### User Schema
- `username`: String
- `password`: String
- `purchasedCourses`: Array of course IDs

### Admin Schema
- `username`: String
- `password`: String

### Course Schema
- `title`: String
- `description`: String
- `price`: Number
- `content`: Array of strings

### Purchase Schema
- `userId`: ObjectId
- `courseId`: ObjectId
- `purchaseDate`: Date

## Middleware
- **User Authentication**: Validates user tokens for protected routes.
- **Admin Authentication**: Validates admin tokens for admin routes.
