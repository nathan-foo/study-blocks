import mongoose, { Schema } from "mongoose";

const schema = new Schema(
    {
        blockId: String,
        createdBy: String,
        topic: String,
        difficulty: String,
    }
);

const Block = mongoose.models.Block || mongoose.model("Block", schema);
export default Block;