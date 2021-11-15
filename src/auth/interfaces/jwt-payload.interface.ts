export interface IJwtPayload {
    id: string;
    username: string;
    password: string;
    role: [];
    iat?: Date;
}