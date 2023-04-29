import React, {FC} from 'react';
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import "./todo.scss"
import {todoType} from "../../../types/todoType";

type TaskProps = {
    task: todoType;
    toggleComplete: (id: number) => void;
    handleTaskClick: (event: React.MouseEvent, task: todoType) => void;
    isSub?: boolean
};

const Todo: FC<TaskProps> = ({task, toggleComplete, handleTaskClick, isSub}) => {

    const handleClick = (event: React.MouseEvent) => {
        if (!isSub) {
            handleTaskClick(event, task);
        }
    };

    const handleCheckboxChange = () => {
        if (isSub) {
            toggleComplete(task.id);
        } else {
            toggleComplete(task.id);
        }
    };

    return (
        <div className="container_todo">
            <CustomCheckbox
                id={task.id.toString()}
                onCheckboxChange={handleCheckboxChange}
            />
            <span
                onClick={handleClick}
                className={`title_todo${task.completed ? " completed" : ""}`}
            >
            {task.title}
        </span>
        </div>
    );
};


export default Todo;
