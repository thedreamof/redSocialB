import { Document } from "mongoose";

export interface  IPublication extends Document {
    title: string;
    description: string;
    image: string;
    likes: User[];
    comments: Comment[];
    userCreated: User;
    createAt: Date;
}

class Comment {
    description: string;
    users: User;
    likes: User[];
}

class User {
    idUser: string;
    username: string;
    avatar: string;
}

export interface IAddLikeDTO {
    id: string;
    username: string;
    avatar: string;
}