import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Users")
    .then(() => {
        console.log("mongoose is working");

    })


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String
}, {
    timestamps: true
})

const userModel = mongoose.model("User", UserSchema)

export default userModel