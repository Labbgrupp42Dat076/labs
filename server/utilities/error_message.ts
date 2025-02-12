import { Response } from 'express';

export class ErrorMessage extends Error {
    public status: number;
    constructor(message: string , status: number) {
        super(message);
        this.status = status;
    }

    public static setResponseToErrorMessage(error: unknown, res: Response): void {
        if (error instanceof ErrorMessage) {
            res.status(error.status).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }


}