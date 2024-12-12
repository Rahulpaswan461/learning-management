const { default: mongoose } = require("mongoose")
const Course = require("../models/course")
const { courseValidation } = require("./validation/validation")

// Function to add a new course with validation
async function addCourse(req, res) {
    try {
        // Validate request body
        const { error, value } = courseValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { title, description, duration, instructor } = value;

        // Create and save a new course
        let course = new Course({
            title,
            description,
            duration,
            instructor
        });

        course = await course.save();

        if (!course) {
            return res.status(400).json({ error: "No courses are created!!" });
        }

        return res.status(200).json({"success":"course added successfully !!"});
    } catch (error) {
        console.log("There is some error", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Function to update existing course details by ID
async function updateCourseDetails(req, res) {
    try {
        // Validate course ID
        if (!mongoose.isValidObjectId(req.params.courseId)) {
            return res.status(400).json({ error: "Invalid course ID" });
        }

        const { title, description } = req.body;

        // Ensure all required fields are provided
        if (!title || !description) {
            return res.status(400).json({ error: "Incomplete Information!!" });
        }

        // Update course details
        const course = await Course.findByIdAndUpdate(req.params.courseId, {
            title,
            description
        }, { new: true });

        if (!course) {
            return res.status(400).json({ error: "No course found with the given ID" });
        }

        return res.status(200).json(course);
    } catch (error) {
        console.log("There is some error", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Function to delete a course by ID
async function deleteCourse(req, res) {
    try {
        // Validate course ID
        if (!mongoose.isValidObjectId(req.params.courseId)) {
            return res.status(400).json({ error: "Invalid course ID" });
        }

        // Delete the course
        const course = await Course.findByIdAndDelete(req.params.courseId);

        if (!course) {
            return res.status(400).json({ error: "No course found with the given ID" });
        }

        return res.status(200).json({ success: "Course deleted successfully!!" });
    } catch (error) {
        console.log("There is some error", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Function to fetch the list of all courses
async function getListofAllCourses(req, res) {
    try {
        const courses = await Course.find({});
        if (!courses || courses.length === 0) {
            return res.status(400).json({ error: "No courses available!!" });
        }

        return res.status(200).json(courses);
    } catch (error) {
        console.log("There is some error", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Function to search courses by title
async function searchCourses(req, res) {
    try {
        const title = req.query.q;

        // Find courses matching the title
        const course = await Course.find({ title });
        if (!course || course.length === 0) {
            return res.status(400).json({ error: "No courses found!" });
        }

        return res.status(200).json(course);
    } catch (error) {
        console.log("There is some error", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    addCourse,
    updateCourseDetails,
    deleteCourse,
    getListofAllCourses,
    searchCourses
}
