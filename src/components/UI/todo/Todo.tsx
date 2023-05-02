import React, {FC, useEffect} from 'react';
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import "./todo.scss"
import {todoType} from "../../../types/todoType";
import DeleteButton from "../DeleteButton/DeleteButton";
import {useDispatch} from 'react-redux';
import {deleteTodo, setSelectedTask} from '../../../store/todoSlice';

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

    };

    const handleDeleteTodo = () => {
        dispatch(deleteTodo({id: task.id}));
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
            <DeleteButton handleComplete={handleDeleteTodo}/>
        </div>
    );
};


export default Todo;
