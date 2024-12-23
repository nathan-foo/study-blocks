import mongoose, { Schema } from "mongoose";

const schema = new Schema(
    {
        name: String,
        email: String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", schema);

export default User;