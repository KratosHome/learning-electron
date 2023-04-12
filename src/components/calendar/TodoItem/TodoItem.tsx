import React, {FC} from 'react';

interface Todo {
    id: number;
    date: Date;
    text: string;
}

interface TodoItemProps {
    todo: Todo;
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

