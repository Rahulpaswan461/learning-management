const { default: mongoose } = require("mongoose")
const User = require("../models/user")
const Course = require("../models/course")
const { createUservalidation } = require("./validation/validation")

// Creates a new user with the provided details after validating the input
async function createUser(req, res) {
    try {
        const { error, value } = createUservalidation.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.message })
        }
        const { name, email, password, role } = value

        let user = new User({
            name,
            email,
            password,
            role
        })

        user = await user.save()

        if (!user) {
            return res.status(400).json({ error: "No user created !!" })
        }

        return res.status(201).json({success:"User created successfully !!"})
    } catch (error) {
        console.log("There is some error", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

// Authenticates a user and generates a token if credentials are valid
async function loginUser(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Bad request: Incomplete Information !!" })
        }

        const token = await User.matchPasswordAndGenerateToken(email, password)

        return res.cookie("token", token).status(200).json({success:"User logged in successfully !!"})
    } catch (error) {
        console.log("There is some error", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

// Enrolls the current user in a course if not already enrolled
async function enrolledInCourse(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.courseId)) {
            return res.status(400).json({ error: "Invalid course id !!" })
        }
        const courseId = req.params.courseId
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: 'You are already enrolled in this course.' })
        }

        user.enrolledCourses.push(req.params.courseId)

        await user.save()

        return res.status(200).json({success:"Enroll successfully !!"})
    } catch (error) {
        console.log("There is some error", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

// Fetches all courses not yet enrolled by the user
async function seeAvailableCourse(req, res) {
    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const availableCourses = await Course.find({
            _id: { $nin: user.enrolledCourses } // Exclude courses in enrolledCourses
        }).lean()

        return res.status(200).json(availableCourses)
    } catch (error) {
        console.log("There is some error", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

// Retrieves all courses the user is currently enrolled in
async function getEnrolledCourses(req, res) {
    try {
        const user = await User.find({ _id: req.user._id }).populate("enrolledCourses")
            .select("enrolledCourses -_id")

        return res.status(200).json(user)
    } catch (error) {
        console.log("There is some error", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = {
    createUser,
    loginUser,
    enrolledInCourse,
    seeAvailableCourse,
    getEnrolledCourses
}
