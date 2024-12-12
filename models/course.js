const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    duration:{
        type:String
    },
    instructor:{
        type:String,
        required:true
    }
},{timestamps:true})

const Course = mongoose.model("course",courseSchema)

module.exports = Course