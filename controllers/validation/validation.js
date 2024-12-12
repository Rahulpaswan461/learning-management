const Joi = require("joi")

// Validation schema for user creation
const createUservalidation = Joi.object({
    name: Joi.string().required(), // User's name is required
    email: Joi.string().email().required(), // Valid email is required
    password: Joi.string().required(), // Password is required
    role: Joi.string().optional() // User's role is optional
})

// Validation schema for course creation
const courseValidation = Joi.object({
    title: Joi.string().required(), // Course title is required
    description: Joi.string().required(), // Course description is required
    duration: Joi.string().required(), // Course duration is required
    instructor: Joi.string().required() // Instructor's name is required
})

module.exports = {
    createUservalidation, // Exporting user validation schema
    courseValidation // Exporting course validation schema
}
