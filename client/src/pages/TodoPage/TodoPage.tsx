import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TodoPage.css';

import { requestAddTodo, toggleTodoDone, requestDeleteTodo, requestAllTodos } from '../../api/todoOperations';


/**
 * Represents a single todo item.
 */
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

/**
 * The TodoPage component is a React functional component that manages a list of todo items.
 * It allows users to add, toggle, delete, and filter todos.
 */
const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [display, setDisplay] = useState<string>('all');
    const navigate = useNavigate();
    /**
     * Fetches all todos from the server and updates the state.
     */
    const fetchTodos = async () => {
        try {
            const localTodos = await requestAllTodos();
            setTodos(localTodos);
        } catch (error:any) {
            navigate('/error/' + error.response.status);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    /**
     * Handles the key press event for the input field.
     * Adds a new todo when the Enter key is pressed.
     * 
     * @param e - The keyboard event.
     */
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    /**
     * Adds a new todo to the list.
     */
    const addTodo = async () => {
        if (newTodo.trim() === '') return;

        try {
            const responseTodo = await requestAddTodo(newTodo);
            setTodos([...todos, { id: responseTodo.data.id, title: newTodo, completed: false }]);
            setNewTodo('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    /**
     * Toggles the completion status of a todo.
     * 
     * @param id - The ID of the todo to toggle.
     */
    const toggleTodo = async (id: number) => {
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return;
        try {
            await toggleTodoDone(todo, id);
            fetchTodos();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    /**
     * Deletes a todo from the list.
     * 
     * @param id - The ID of the todo to delete.
     */
    const deleteTodo = async (id: number) => {
        try {
            await requestDeleteTodo(id);
            fetchTodos();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    /**
     * Clears all completed todos from the list.
     */
    const clearCompleted = async () => {
        const completedTodos = todos.filter(todo => todo.completed);
        await Promise.all(completedTodos.map(todo => deleteTodo(todo.id)));
    };

    /**
     * Filters the todos based on the current display filter.
     */
    const filteredTodos = todos.filter(todo => {
        if (display === 'all') return true;
        if (display === 'active') return !todo.completed;
        if (display === 'completed') return todo.completed;
        return true;
    });


    return (
        <div className='todo-page'>
            <header>
                <input
                    type="text"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new todo"
                />
                <button onClick={addTodo}>Add</button>
            </header>

            <div className='display-buttons'>
                <button
                    className={display === 'all' ? 'active-filter' : ''}
                    onClick={() => setDisplay('all')}
                >
                    All
                </button>
                <button
                    className={display === 'active' ? 'active-filter' : ''}
                    onClick={() => setDisplay('active')}
                >
                    Active
                </button>
                <button
                    className={display === 'completed' ? 'active-filter' : ''}
                    onClick={() => setDisplay('completed')}
                >
                    Completed
                </button>
            </div>

            <hr />

            <ul>
                {filteredTodos.map(todo => (
                    <li className={`todo-item ${todo.completed ? 'completed' : ''}`} key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span onClick={() => toggleTodo(todo.id)}>
                            {todo.title}
                        </span>
                        <button className='delete-button' onClick={() => deleteTodo(todo.id)}>
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </li>
                ))}
            </ul>

            {todos.some(todo => todo.completed) && (
                <>
                    <hr />
                    <button onClick={clearCompleted} className='clear-completed-button'>
                        Clear completed todos
                    </button>
                </>
            )}
        </div>
    );
};

export default TodoPage;
