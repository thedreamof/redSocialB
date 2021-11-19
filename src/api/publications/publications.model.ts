import { Schema } from 'mongoose';

export const PublicationSchema = new Schema({
  title: { type: String, required: false },
  description: { type: String, required: true },
  image: { type: String, required: false },
  likes: { type: Array, required: false },
  comments: { type: Array, required: false },
  userCreated: {
    type: {
      idUser: String,
      username: String,
      avatar: String,
    },
    required: true,
  },
  createAt: { type: Date, default: Date.now },
});
