export class UserDTO {
    username: string;
    password: string;
    name: string;
    lastname: string;
    avatar: string;
    description: string;
}

export class UserUpdateDTO {
    name: string;
    lastname: string;
    avatar: string;
    description: string;
}