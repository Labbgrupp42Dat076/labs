import { User } from '../model/user';
import { ErrorMessage } from '../../utilities/error_message';
import session from 'express-session';
export class UserService {
    users: User[] = [


        {
            id: 0,
            name: "admin",
            password: "admin",
            noteIds: [0],
            todoIds: [],
            lastPomodoroSession: 0
        }
    ];

    public async login(name: string, password: string): Promise<User> {

        // doe some db check later
        let user = this.users.find((item) => item.name === name && item.password === password);
        if (user) {
            return await user;
        } else {
            throw new ErrorMessage('User not found', 404);
        }
    }

    public async register(user: User): Promise<number> {
        // might need a db check later :)
        if (this.users.find((item) => item.id === user.id)) {
            throw new ErrorMessage('User already exists', 400);
        }
        this.users.push(user);
        return user.id;
    }

    public async getUsers(): Promise<User[]> {
        return await this.users;
    }

    public async getUser(id: number): Promise<User> {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            return await user;
        } else {
            throw new ErrorMessage('User not found', 404);
        }
    }

    public async deleteUser(id: number): Promise<void> {
        let hasDeleted: boolean = false;
        this.users = this.users.filter((item) => {
            if (item.id !== id) {
                return true;
            } else {
                hasDeleted = true;
                return false;
            }
        })
        if (!hasDeleted) {
            throw new ErrorMessage('User not found', 404);
        }
    }

    private updateUser(user: User): void  {
        this.users = this.users.map((item) => {
            return user.id === item.id ? user : item;
        });
    }

    async addNoteId(id: number, noteId: number): Promise<User> {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            if (user.noteIds.includes(noteId)) {
                throw new ErrorMessage('Note already added', 400);
            }
            user.noteIds.push(noteId);

        } else {
            throw new ErrorMessage('User not found', 404);
        }

        this.updateUser(user);
        
        return await user;
    }

    public async addTodoId(id: number, todoId: number): Promise<User> {
        console.log("adding todo id " + todoId)
 

        let user = this.users.find((item) => item.id === id);
       
        if (user) {
            if (user.todoIds.includes(todoId)) {
                console.log("hello")
                throw new ErrorMessage('Todo already added', 400);
            }
            user.todoIds.push(todoId);

        } else {
            throw new ErrorMessage('User not found', 404);
        }
        await this.updateUser(user);
        console.log(user)
        return await user;
    }


    public async setLastPomodoroSessionToNow(id: number): Promise<void> {
        let lastPomodoroSession: number = Date.now();
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.lastPomodoroSession = lastPomodoroSession;
        } else {
            throw new ErrorMessage('User not found', 404);
        }
        this.updateUser(user);

    }

    public async getLastPomodoroSession(id: number): Promise<number> {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            return await user.lastPomodoroSession;
        } else {
            throw new ErrorMessage('User not found', 404);
        }
    }

    public async getNoteIds(id: number): Promise<number[]> {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            return await user.noteIds;
        } else {
            throw new ErrorMessage('User not found', 404);
        }
    }

    public async getTodoIds(id: number): Promise<number[]> {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            return await user.todoIds;
        } else {
            throw new Error('User not found');
        }
    }


    public async deleteNoteId(id: number, noteId: number): Promise<void> {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.noteIds = user.noteIds.filter((item) => item !== noteId);
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);

    }

    public async deleteTodoId(id: number, todoId: number): Promise<void> {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.todoIds = user.todoIds.filter((item) => item !== todoId);
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);

    }

    public async updateUserNames(id: number, name: string): Promise<void> {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.name = name;
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);

    }

    public async updateUserPasswords(id: number, password: string): Promise<void> {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.password = password;
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);

    }






}


const userService = new UserService();
export default userService;