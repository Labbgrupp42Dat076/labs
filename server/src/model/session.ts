export interface Session{
    id: number;
    userId: number;
    token: string;
    expiration: number;
}