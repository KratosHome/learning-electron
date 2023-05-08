import React, {FC, useEffect, useState} from 'react';
import {todoType} from "../../types/todoType";
import {addSubTodo, addTodo} from "../../store/todoSlice";
import {useDispatch} from "react-redux";
import "./AddTodo.scss"
import MayInput from "../UI/MayInput/MayInput";
import {useTranslation} from "react-i18next";

type AddTodoType = {
    isSub?: boolean
    todoId?: number
}


const AddTodo: FC<AddTodoType> = ({isSub, todoId}) => {
    const dispatch = useDispatch(); // Додайте цей рядок
    const {t} = useTranslation();
    const [newTask, setNewTask] = useState("");
    const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    };
    const addTask = () => {
        if (newTask.trim()) {
            const newTodo: todoType = {
                id: Date.now(),
                date: null,
                timeStart: null,
                timeEnd: null,
                timer: 0,
                title: newTask,
                text: newTask,
                pathMD: newTask,
                completed: false,
                notifications: false,
                delete: false,
                subTodo: [],
            };
            if (isSub && todoId) {
                dispatch(addSubTodo({todoId, subTodo: newTodo}));
            } else {
                dispatch(addTodo(newTodo));
            }
            setNewTask("");
        }
    };



    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                addTask();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [newTask]);

    return (
        <div className="container_add_todo">
            <MayInput
                translate={`${t('new_task')}`}
                value={newTask}
                onChange={handleNewTaskChange}
            />
            <button onClick={addTask}>{t('addTask')}</button>
        </div>
    );
};

export default AddTodo;
