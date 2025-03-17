import axiosInstance from "./axiosInstance";

/**
 * Represents a todo item.
 */
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

/**
 * Sends a request to add a new todo item.
 *
 * @param newTodo - The title of the new todo item to be added.
 * @returns The response from the server containing the added todo item.
 * @throws Will throw an error if the todo item could not be added.
 */
export async function requestAddTodo(newTodo: string) {
    const responseTodo = await axiosInstance.post('/todo', {
        title: newTodo,
    });

    if (!responseTodo.data.message) throw new Error('Failed to add todo');

    await axiosInstance.post('/user/todo', {
        todoId: responseTodo.data.id,
    });
    return responseTodo;
}


/**
 * Toggles the completion status of a todo item.
 *
 * @param {Todo} todo - The todo item to toggle.
 * @param {number} id - The ID of the todo item.
 * @throws {Error} Throws an error if the request to toggle the todo fails.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export async function toggleTodoDone(todo: Todo, id: number) {
    try {
        const endpoint = todo.completed ? `/todo/${id}/undone` : `/todo/${id}/done`;
        const response = await axiosInstance.post(endpoint);
    } catch (error) {
        console.log(error)
    }

}


/**
 * Sends a request to delete a todo item by its ID.
 *
 * This function first sends a DELETE request to the server to delete the todo item.
 * If the response does not contain a success message, it logs the response and throws an error.
 * If the deletion is successful, it then sends another DELETE request to remove the todo item
 * from the user's list of todos.
 *
 * @param {number} id - The ID of the todo item to be deleted.
 * @throws Will throw an error if the todo item could not be deleted.
 */
export async function requestDeleteTodo(id: number): Promise<void> {
    const response = await axiosInstance.delete(`/todo/${id}`);

    if (!response.data.message) {
        console.log(response);
        throw new Error('Failed to delete todo');
    }

    // then delete it for the user
    await axiosInstance.delete(`/user/todos/${id}`);
}


/**
 * Fetches all todo items from the server.
 *
 * @returns {Promise<any>} A promise that resolves to the data containing all todo items.
 * @throws {Error} Throws an error if the request fails.
 */
export async function requestAllTodos(): Promise<any> {
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
