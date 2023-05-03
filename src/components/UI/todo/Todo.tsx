import React, {FC, useEffect} from 'react';
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import "./todo.scss"
import {todoType} from "../../../types/todoType";
import DeleteButton from "../DeleteButton/DeleteButton";
import {useDispatch} from 'react-redux';
import {completeTodo, deleteTodo, removeTodo, setSelectedTask, uncompletedTodo} from '../../../store/todoSlice';

type TaskProps = {
    task: todoType;
    handleTaskClick: (event: React.MouseEvent, task: todoType) => void;
    isSub?: boolean
    isComplete?: boolean
    isDelete?: boolean
};

const Todo: FC<TaskProps> = ({task, handleTaskClick, isSub, isComplete, isDelete}) => {
    const dispatch = useDispatch();


    const handleClick = (event: React.MouseEvent) => {
        if (!isSub) {
            handleTaskClick(event, task);
        }
    };

    const handleCheckboxChange = () => {
        if (isComplete) {
            dispatch(uncompletedTodo({id: task.id}));
        } else {
            dispatch(completeTodo({id: task.id}));
        }
    };

    const handleDeleteTodo = () => {
        if (isDelete || isComplete) {
            dispatch(removeTodo({id: task.id}));
        } else {
            dispatch(deleteTodo({id: task.id}));
        }
    };


    return (
        <div className="container_todo">
            <CustomCheckbox
                id={task.id.toString()}
                onCheckboxChange={handleCheckboxChange}
                checked={task.completed}
            />
            <span
                onClick={handleClick}
                className={`title_todo${task.completed ? " completed" : ""}`}
            >
            {task.title}
        </span>
            <DeleteButton handleComplete={handleDeleteTodo}/>
        </div>
    );
};


export default Todo;
