import { user } from '../model/user';

class userService {
    users: user[] = [];

    public async login() {
        // do something
    }

    public async register(user:user) {
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
        this.users = this.users.filter((item) => item.id !== id);
        if (this.users.length === 0) {
            throw new Error('No user found');
        }
    }

    private async updateUser(user: user) {
        this.users = this.users.map((item) => {
            return user.id === item.id ? user : item;
        });
    }

    public async addNoteId(id: number, noteId: number) {
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


    public async setLastPomodoroSession(id: number, lastPomodoroSession: number) {
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

    



}