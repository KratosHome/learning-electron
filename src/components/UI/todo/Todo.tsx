import React, {FC} from 'react';
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import "./todo.scss"
import {todoType} from "../../../types/todoType";

type TaskProps = {
    task: todoType;
    toggleComplete: (id: number) => void;
    handleTaskClick: (event: React.MouseEvent, task: todoType) => void;
};

const Todo: FC<TaskProps> = ({task, toggleComplete, handleTaskClick}) => {
    return (
        <div className="container_todo">
            <CustomCheckbox
                id={task.id.toString()}
                onCheckboxChange={() => toggleComplete(task.id)}
            />
            <span
                onClick={(event) => handleTaskClick(event, task)}
                className="title_todo"
            >
                {task.title}
            </span>
        </div>
    );
};

export default Todo;
