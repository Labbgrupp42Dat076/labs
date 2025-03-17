import { User } from '../../model/user';

export interface IUserService {
 


    login(name: string, password: string): Promise<User> 

    register(user: User): Promise<number> 

    getUsers(): Promise<User[]> 

    getUser(id: number): Promise<User>

    deleteUser(id: number): Promise<void> 
   
    addNoteId(id: number, noteId: number): Promise<User> 

    addTodoId(id: number, todoId: number): Promise<User>


    // setLastPomodoroSessionToNow(id: number): Promise<void> 

    // getLastPomodoroSession(id: number): Promise<number> 

    // deletePomodoroId(id: number, pomodoroId: number): Promise<void> 

    getNoteIds(id: number): Promise<number[]>
    getTodoIds(id: number): Promise<number[]> 


    deleteNoteId(id: number, noteId: number): Promise<void> 

    deleteTodoId(id: number, todoId: number): Promise<void> 

    updateUserNames(id: number, name: string): Promise<void> 

    updateUserPasswords(id: number, password: string): Promise<void> 

    getNewUserId(): Promise<number> 

}


