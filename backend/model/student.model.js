import mongoose, { Types } from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    grade: {
        type: String,
        enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'],
        required: true
    },
    dateOfBirth:{
        type:Date,
        required: true
    },
    gender:{
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default:true
    }
}, { timestamps: true})

const Student = mongoose.model("student", studentSchema);
export default Student;