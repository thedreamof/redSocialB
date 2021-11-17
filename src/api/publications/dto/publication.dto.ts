export class PublicationDTO {
    title: string;
    description: string;
    image: string;
    likes: User[];
    comments: Comment[];
    userCreated: User;
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

export class AddLikeDTO {
    id: string;
    username: string;
    avatar: string;
}
