import axiosInstance from "./axiosInstance";


export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export async function requestAddTodo(newTodo: string) {
    const responseTodo = await axiosInstance.post('/todo', {
        title: newTodo,
    });

    if (!responseTodo.data.message) {
        throw new Error('Failed to add todo');
    }

    await axiosInstance.post('/user/todo', {
        todoId: responseTodo.data.id,
    });
    return responseTodo;
}



export async function toggleTodoDone(todo: Todo, id: number) {
    const endpoint = todo.completed ? `/todo/${id}/undone` : `/todo/${id}/done`;
    const response = await fetch(endpoint, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to toggle todo');
    }
}


export async function requestDeleteTodo(id: number) {
    const response = await axiosInstance.delete(`/todo/${id}`);

    if (!response.data.message) {
        console.log(response);
        throw new Error('Failed to delete todo');
    }

    // then delete it for the user
    await axiosInstance.delete(`/user/todos/${id}`);
}


export async function requestAllTodos() {
    const response = await axiosInstance.get('/todo');
    const data = await response.data;
    return data;
}


export interface TodoData {
    id: number;
    title: string;
    completed: boolean;
    selectedfromNote: boolean;
}
