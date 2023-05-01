import React, {FC} from 'react';
import {todoType} from "../../../types/todoType";


interface TodoItemProps {
    todo: todoType;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, todoId: number) => void;
}

export const TodoItem: FC<TodoItemProps> = ({todo, handleDragStart}) => (
    <div
        key={todo.id}
        draggable
        onDragStart={(e) => handleDragStart(e, todo.id)}
    >
        {todo.text}
    </div>
);

