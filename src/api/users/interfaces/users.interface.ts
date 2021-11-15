import { Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    name: string;
    lastname: string;
    avatar: string;
    description: string;
}

export interface IUserBasic extends Document {
    username: string;
    avatar: string;
}