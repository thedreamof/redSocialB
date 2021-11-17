export interface IJwtPayload {
    idUser: string;
    username: string;
    password: string;
    role: [];
    iat?: Date;
}