import mongoose, { Schema } from "mongoose";

const schema = new Schema(
    {
        createdBy: String,
        topic: String,
        difficulty: String,
        outline: Object,
        quiz: Object,
    }
);

const Block = mongoose.models.Block || mongoose.model("Block", schema);
export default Block;