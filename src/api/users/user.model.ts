import { Schema } from "mongoose";

export const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    avatar: { type: String, required: false },
    description: { type: String, required: true },    
})
