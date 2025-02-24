import React, { useState, useEffect } from 'react';
import './TodoPage.css';

import { requestAddTodo, toggleTodoDone, requestDeleteTodo, requestAllTodos } from '../../api/todoOperations';



interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [display, setDisplay] = useState<string>('all');

    const fetchTodos = async () => {
        try {
            const localTodos = await requestAllTodos();
            setTodos(localTodos);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

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

    const deleteTodo = async (id: number) => {
        try {
            await requestDeleteTodo(id);
            fetchTodos();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const clearCompleted = async () => {
        const completedTodos = todos.filter(todo => todo.completed);
        await Promise.all(completedTodos.map(todo => deleteTodo(todo.id)));
    };

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
