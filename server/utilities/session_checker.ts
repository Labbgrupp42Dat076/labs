import { User } from "../src/model/user";
import { ErrorMessage } from "./error_message";
import { Request } from "express"

export function check_session(req: Request): User {

        const user = req.session.user as User | undefined;
        
        if (!user) {
            throw new ErrorMessage('User not logged in', 400);
        }

        return user;
}