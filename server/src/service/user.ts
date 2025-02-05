import { User } from '../model/user';


class userService {
    users: User[] = [];

    public async login(name: string, password: string) {
        // do something
    }

    public async register(user:User) {
        return await this.users.push(user);

    }

    public async getUsers() {
        return await this.users;
    }

    public async getUser(id: number) {
        let user = this.users.find((item) => item.id === id);
        if( user) {
            return await user;
        } else {
            throw new Error('User not found');
        }
    }

    public async deleteUser(id: number) {
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
            throw new Error('User not found');
        }
    }

    private async updateUser(user: User) {
        this.users = this.users.map((item) => {
            return user.id === item.id ? user : item;
        });
    }

    async addNoteId(id: number, noteId: number) {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.noteIds.push(noteId);

        } else {
            throw new Error('User not found');
        }

        this.updateUser(user);

        return await user;
    }

    public async addTodoId(id: number, todoId: number) {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.todoIds.push(todoId);
        
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);
        return await user;
    }


    public async setLastPomodoroSessionToNow(id: number) {
        let lastPomodoroSession: number = Date.now();
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.lastPomodoroSession = lastPomodoroSession;
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);
        return await user;
    }

    public async getLastPomodoroSession(id: number) {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            return await user.lastPomodoroSession;
        } else {
            throw new Error('User not found');
        }
    }

    public async getNoteIds(id: number) {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            return await user.noteIds;
        } else {
            throw new Error('User not found');
        }
    }

    public async getTodoIds(id: number) {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            return await user.todoIds;
        } else {
            throw new Error('User not found');
        }
    }


    public async deleteNoteId(id: number, noteId: number) {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.noteIds = user.noteIds.filter((item) => item !== noteId);
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);
        return await user;
    }

    public async deleteTodoId(id: number, todoId: number) {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.todoIds = user.todoIds.filter((item) => item !== todoId);
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);
        return await user;
    }

    public async updateUserNames(id: number, name: string) {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.name = name;
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);
        return await user;
    }

    public async updateUserPasswords(id: number, password: string) {
        let user = this.users.find((item) => item.id === id);
        if (user) {
            user.password = password;
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);
        return await user;
    }







}

export default new userService();