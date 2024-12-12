const express = require("express")
const {
    createUser, 
    loginUser, 
    enrolledInCourse, 
    seeAvailableCourse, 
    getEnrolledCourses
} = require("../controllers/user.js")
const { isUser } = require("../middleware/authorization.js")

const router = express.Router()

// Route for user signup
// Endpoint: POST /signup
router.post("/signup", createUser)

// Route for user login
// Endpoint: POST /login
router.post("/login", loginUser)

// Route to enroll a user in a course by course ID
// Endpoint: POST /enroll/:courseId
router.post("/enroll/:courseId", isUser, enrolledInCourse)

// Route to see courses available for enrollment (excluding already enrolled courses)
// Endpoint: GET /available
router.get("/available", seeAvailableCourse)

// Route to retrieve a list of courses the user is enrolled in
// Endpoint: GET /enrolledCourses
router.get("/enrolledCourses",isUser, getEnrolledCourses)

module.exports = router
