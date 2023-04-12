import React, {FC} from 'react';

type TodoItem = {
    todo: any
    handleDragStart: any
}


export const TodoItem: FC<TodoItem> = ({todo, handleDragStart}) => (
    <div
        key={todo.id}
        draggable
        onDragStart={(e) => handleDragStart(e, todo.id)}
    >
        {todo.text}
    </div>
);

