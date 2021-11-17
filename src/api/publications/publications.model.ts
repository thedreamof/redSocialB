import { Schema } from "mongoose";

export const PublicationSchema = new Schema({
    title: { type: String, required: false, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    likes: { type: Array, required: false },
    comments: { type: Array, required: false },
    userCreated: { type: {
        idUser: String,
        username: String,
        avatar: String,
    }, required: true, unique: false },
    createAt: { type: Date, default: Date.now },
})
