import { model, models, Schema } from "mongoose";
import { UserInterface } from "./user.interface";
import bcrypt from "bcrypt"

const userSchema = new Schema<UserInterface>({
    email: {
        type: String,
        required: true,
        unique: [true, "Please use any other email, this email is already registerd."],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password kam se kam 8 characters ka hona chahiye'],
    },
    refresh_token: {
        type: String,
        default: null,
    },
    last_login: {
        type: Date,  
        default: null
    },
    profile_image_url: {
        type: String,
        default: null
    },
    auth_provider: {
        type: String,
        enum: ["google", "local"],
        default: "local"
    }

},{timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next;

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const UserModel = models.User || model<UserInterface>("User", userSchema)

export default UserModel;