import mongoose, { Schema } from "mongoose";

const schema = new Schema(
    {
        title: String,
        description: String,
        createdBy: String,
    }
);

const Course = mongoose.models.Course || mongoose.model("Course", schema);
export default Course;