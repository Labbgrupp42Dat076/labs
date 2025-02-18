import { User } from "../src/model/user";
import { ErrorMessage } from "./error_message";
import { Request } from "express"

import userService  from "../src/service/user";

export function check_session(req: Request): User {

    // proper method used later
        const user = req.session.user as User | undefined;
        
        if (!user) {
            throw new ErrorMessage('User not logged in', 400);
        }

        return user;

     
}

