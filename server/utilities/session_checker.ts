import { User } from "../src/model/user";
import { ErrorMessage } from "./error_message";

export function check_session(req: any): User {
    //todo move this to note?? maybe functionally decompose
        const user = req.session.user as User | undefined;
        
        if (!user) {
            throw new ErrorMessage('User not logged in', 400);
        }

        return user;
}