import mongoose from "mongoose";
const UserNoteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Title is required"],
        },
        content:{
            type: String,
            required: [true, "Content is required"],
        },
        isCompleted:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);
const UserNote = mongoose.model("User", UserNoteSchema);
export default UserNote;
