const express = require("express")
const {
    addCourse, 
    updateCourseDetails, 
    getListofAllCourses, 
    deleteCourse, 
    searchCourses
} = require("../controllers/course")
const { isAdmin } = require("../middleware/authorization")

const router = express.Router()

// Route to add a new course
// Endpoint: POST /add
router.post("/add",isAdmin, addCourse)

// Route to update details of an existing course by its ID
// Endpoint: PATCH /update/:courseId
router.patch("/update/:courseId", isAdmin,updateCourseDetails)

// Route to delete a course by its ID
// Endpoint: DELETE /delete/:courseId
router.delete("/delete/:courseId",isAdmin, deleteCourse)

// Route to retrieve the list of all courses
// Endpoint: GET /get/allCourse
router.get("/get/allCourse", getListofAllCourses)

// Route to search for courses based on query parameters
// Endpoint: GET /search
router.get("/search", searchCourses)

module.exports = router
