import React, {useEffect, useState} from 'react';
import {todoType} from "../../types/todoType";
import {addTodo} from "../../store/todoSlice";
import {useDispatch} from "react-redux";

const AddTodo = () => {
    const dispatch = useDispatch(); // Додайте цей рядок

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
            dispatch(addTodo(newTodo));
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
        <div>
            <input
                type="text"
                placeholder="Нове завдання"
                value={newTask}
                onChange={handleNewTaskChange}
            />
            <button onClick={addTask}>Додати завдання</button>
        </div>
    );
};

export default AddTodo;
