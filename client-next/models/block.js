import mongoose, { Schema } from "mongoose";

const schema = new Schema(
    {
        title: String,
        description: String,
        createdBy: String,
    }
);

const Block = mongoose.models.Block || mongoose.model("Block", schema);
export default Block;