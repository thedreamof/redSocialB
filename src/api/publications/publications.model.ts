import { Schema } from "mongoose";

export const PublicationSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    likes: { type: Array, required: false },
    comments: { type: Array, required: false },
    userCreated: { type: Object, required: true },
    createAt: { type: Date, default: Date.now },
})
