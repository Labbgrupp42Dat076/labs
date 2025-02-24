import React, { useState, useEffect } from 'react';
import './TodoPage.css';
import { requestAddTodo, toggleTodoDone, requestDeleteTodo, requestAllTodos } from '../../api/todoOperations';



interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const TodoPage: React.FC = () => {
    const [allTodos, setAllTodos] = useState<Todo[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [display, setDisplay] = useState<string>('all');


    const fetchTodos = async () => {
        let localTodos: Todo[] = [];
        try{
            localTodos = await requestAllTodos(localTodos);
        } catch (error) {
            console.error('Error:', error);
        }
      
        console.log(localTodos)
        setTodos(localTodos);

    }

    useEffect(() => {

        fetchTodos();
    }, []);

    useEffect(() => {
        if (display === 'all') {
            setAllTodos(todos);
        } else if (display === 'active') {
            setAllTodos(todos.filter(todo => !todo.completed));
        } else if (display === 'completed') {
            setAllTodos(todos.filter(todo => todo.completed));
        }
    }, [display, todos]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    const addTodo = async () => {
        if (newTodo.trim() === '') return;

        try {
            const responseTodo = await requestAddTodo(newTodo);
            setAllTodos([...todos, { id: responseTodo.data.id, title: newTodo, completed: false }]);
            setTodos([...todos, { id: responseTodo.data.id, title: newTodo, completed: false }]);
            setNewTodo('')
        } catch (error) {
            console.error('Error:', error);
        }



    };

    const toggleTodo = async (id: number) => {
        const todo = todos.find(todo => todo.id === id);
        console.log(todo)
        if (!todo) return;
        try {
            await toggleTodoDone(todo, id);

        } catch (error) {
            console.error('Error:', error);
        }
        fetchTodos();

    };

    const deleteTodo = async (id: number) => {


        try {
            await requestDeleteTodo(id);
        } catch (error) {
            console.error('Error:', error);
        }
        fetchTodos();
    };

    const clearCompleted = async () => {
        const completedTodos = todos.filter(todo => todo.completed);
        await completedTodos.forEach(async (todo) => {
            await deleteTodo(todo.id);
        })
    }

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

            <hr style={{ borderColor: "#fff", width: "100%" }} />

            <ul>
                {allTodos.map(todo => (
                    <li className={`todo-item ${todo.completed ? 'completed' : ''}`} key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span
                            onClick={() => toggleTodo(todo.id)}
                        >
                            {todo.title}
                        </span>
                        <button className='delete-button' onClick={() => deleteTodo(todo.id)}>
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={clearCompleted} className='clear-completed-button'>
                Clear completed todos
            </button>
        </div>
    );
};

export default TodoPage;






