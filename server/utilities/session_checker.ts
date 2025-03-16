import { User } from "../src/model/user";
import { ErrorMessage } from "./error_message";
import { Request } from "express"

import { UserDbService } from "../src/service/userDb";

const userDbService = new UserDbService();
export async  function check_session(req: Request): Promise<User> {

    // proper method used later
        let user = req.session.user as User | undefined;
       
        console.log("user is " + user)
        if (!user) {
            console.log("user not logged in")
            throw new ErrorMessage('User not logged in', 401);
        }
        user = await userDbService.getUser(user.id)
        return user;

     
}

