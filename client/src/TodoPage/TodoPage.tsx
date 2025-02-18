import React, { useState, useEffect } from 'react';
import './TodoPage.css';
import axios from 'axios';



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
    
        const response = await axios.get('http://localhost:8080/todo')
        const data = await response.data
        console.log(data);
        setTodos(data);
        
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

    const addTodo = () => {
        let todoId: number;
        console.log(newTodo);
        if (newTodo.trim() === '') return;

        axios.post('http://localhost:8080/todo', {
            title: newTodo,
        })
        .then(response => {
            if (!response.data.message) {
            throw new Error('Failed to add todo');
            }
            todoId = response.data.id;
            console.log(response.data.id);
            return response.data;
        }).then(async() => {
            //add todo to the user
            const response  = await axios.post('http://localhost:8080/user/todo', {
                todoId: todoId,
            })
            console.log(response);}
           
        )
        .then(() => {
            fetchTodos()
            setNewTodo('');
        })
        .catch(error => console.error('Error:', error));
    };

    const toggleTodo = (id: number) => {
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return;

        const endpoint = todo.completed ? `http://localhost:8080/todo/${id}/undone` : `http://localhost:8080/todo/${id}/done`;
        fetch(endpoint, {
            method: 'POST',
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to toggle todo');
            }
            return response.json();
        })
        .then(() => {
            fetchTodos();
        })
        .catch(error => console.error('Error:', error));
    };

    const deleteTodo = (id: number) => {
        fetch(`http://localhost:8080/todo/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to delete todo');
            }
            return response.json();
        })
        .then(() => {
            fetchTodos();
        })
        .catch(error => console.error('Error:', error));
    };

    const clearCompleted = () => {
        const completedTodos = todos.filter(todo => todo.completed);
        completedTodos.forEach(todo => {
            fetch(`http://localhost:8080/todo/${todo.id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete todo');
                }
                return response.json();
            })
            .then(() => {
                fetchTodos();
            })
            .catch(error => console.error('Error:', error));
        });
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
