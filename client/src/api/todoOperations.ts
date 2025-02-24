import axios from 'axios';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export async function requestAddTodo(newTodo: string) {
    const responseTodo = await axios.post('http://localhost:8080/todo', {
        title: newTodo,
    });

    if (!responseTodo.data.message) {
        throw new Error('Failed to add todo');
    }

    await axios.post('http://localhost:8080/user/todo', {
        todoId: responseTodo.data.id,
    });
    return responseTodo;
}



export async function toggleTodoDone(todo: Todo, id: number) {
    const endpoint = todo.completed ? `http://localhost:8080/todo/${id}/undone` : `http://localhost:8080/todo/${id}/done`;
    const response = await fetch(endpoint, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to toggle todo');
    }
}


export async function requestDeleteTodo(id: number) {
    const response = await axios.delete(`http://localhost:8080/todo/${id}`);

    if (!response.data.message) {
        console.log(response);
        throw new Error('Failed to delete todo');
    }

    // then delete it for the user
    await axios.delete(`http://localhost:8080/user/todos/${id}`);
}


export async function requestAllTodos() {
    const response = await axios.get('http://localhost:8080/todo');
    const data = await response.data;
    return data;
}