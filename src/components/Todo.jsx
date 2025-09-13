import React from 'react';

const Todo = ({ todo, deleteTodo }) => {
    return (
        <div className="todo-item">
            <span className="todo-text">{todo}</span>
            <button className="eliminar" onClick={deleteTodo}>X</button>
        </div>
    );
}

export default Todo;