import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import Jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: [true, "Username must be unique"],
            lowercase: [true, "Username must be lowercase"],
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already exists"],
            lowercase: [true, "Email must be lowercase"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        notes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserNote",
        }],
    },
    {
        timestamps: true,
    }
);
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
UserSchema.method.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", UserSchema);
export default User;
