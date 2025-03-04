import { User } from '../model/user';
import { ErrorMessage } from '../../utilities/error_message';
import session from 'express-session';
import { time } from 'console';
import bcrypt from 'bcrypt';
import { IUserService } from './userInterface';
import { UserModel } from '../db/user.db';

export class UserDbService implements IUserService {
    salt = bcrypt.genSaltSync(10);
    

    public async login(name: string, password: string): Promise<User> {

        // doe some db check later
        const user: User | null = await UserModel.findOne({ where: { name: name } });
    
        console.log("user found " + user)
        if (user) {
            
            if (bcrypt.compareSync(password, user.password)) {
                return  user;
            }
        }
        throw new ErrorMessage('User not found', 404);
   
    }

    public async register(user: User): Promise<number> {
        // might need a db check later :)
        if (await UserModel.findOne({ where: { name: user.name } })) {
            throw new ErrorMessage('User already exists', 400);
        }
        console.log("registering user " + user.name)
        user.password = bcrypt.hashSync(user.password, this.salt);
        await UserModel.create(user);
        return user.id;
    }

    public async getUsers(): Promise<User[]> {
        return await UserModel.findAll();
    }

    public async getUser(id: number): Promise<User> {
        let user = await UserModel.findByPk(id);
        if (user) {
            return await user;
        } else {
            throw new ErrorMessage('User not found', 404);
        }
    }

    public async deleteUser(id: number): Promise<void> {
       if (await UserModel.findByPk(id)) {
            await UserModel.destroy({ where: { id: id } });
        } else {
            throw new ErrorMessage('User not found', 404);
        }
    }

    private async updateUser(user: User)  {
        console.log("updating user")
        await UserModel.update(
            {
                name: user.name,
                password: user.password,
                noteIds: user.noteIds,
                todoIds: user.todoIds,
                pomodoroIds: user.pomodoroIds,
                lastPomodoroSession: user.lastPomodoroSession
            },
            {
                where: { id: user.id }
            }
        )
        console.log("updated user")
    }

    async addNoteId(id: number, noteId: number): Promise<User> {
        let user = await UserModel.findByPk(id);
        if (user) {
            if (user.noteIds.includes(noteId)) {
                throw new ErrorMessage('Note already added', 400);
            }
            user.noteIds.push(noteId);
      
        } else {
            throw new ErrorMessage('User not found', 404);
        }

        this.updateUser(user);
        console.log("added note id to user " + user.noteIds)
        return await user;
    }

    public async addTodoId(id: number, todoId: number): Promise<User> {
        console.log("adding todo id " + todoId)
 

        let user = await UserModel.findByPk(id);
       
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
        let user = await UserModel.findByPk(id);
        if (user) {
            user.lastPomodoroSession = lastPomodoroSession;
        } else {
            throw new ErrorMessage('User not found', 404);
        }
        this.updateUser(user);

    }

    public async getLastPomodoroSession(id: number): Promise<number> {
        let user = await UserModel.findByPk(id);
        if (user) {
            return await user.lastPomodoroSession;
        } else {
            throw new ErrorMessage('User not found', 404);
        }
    }

    public async deletePomodoroId(id: number, pomodoroId: number): Promise<void> {
        let user = await UserModel.findByPk(id);
        if (user) {
            user.pomodoroIds = user.pomodoroIds.filter((item) => item !== pomodoroId);
        }
        else {
            throw new ErrorMessage('User not found', 404);
        }
        this.updateUser(user);
    }

    public async getNoteIds(id: number): Promise<number[]> {
        let user = await UserModel.findByPk(id);
        if (user) {
            return await user.noteIds;
        } else {
            throw new ErrorMessage('User not found', 404);
        }
    }

    public async getTodoIds(id: number): Promise<number[]> {
        let user = await UserModel.findByPk(id);
        if (user) {
            return await user.todoIds;
        } else {
            throw new Error('User not found');
        }
    }


    public async deleteNoteId(id: number, noteId: number): Promise<void> {
        let user = await UserModel.findByPk(id);
        if (user) {
            user.noteIds = user.noteIds.filter((item) => item !== noteId);
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);

    }

    public async deleteTodoId(id: number, todoId: number): Promise<void> {
        let user = await UserModel.findByPk(id);
        if (user) {
            user.todoIds = user.todoIds.filter((item) => item !== todoId);
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);

    }

    public async updateUserNames(id: number, name: string): Promise<void> {
        let user = await UserModel.findByPk(id);
        if (user) {
            user.name = name;
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);

    }

    public async updateUserPasswords(id: number, password: string): Promise<void> {
        let user = await UserModel.findByPk(id);
        if (user) {
            user.password = password;
        } else {
            throw new Error('User not found');
        }
        this.updateUser(user);

    }

    public async getNewUserId(): Promise<number> {
        //return todays time
        return Math.floor(Date.now()/1000)
    }






}
