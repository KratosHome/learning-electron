import React, {useEffect, useRef, useState} from 'react';
import {todoType} from "../../types/todoType";
import Resize from "../../components/Resize/Resize";
import "./inbox.scss"
import {t} from 'i18next';
import Todo from "../../components/UI/todo/Todo";
import ResizeHandle from "../../components/UI/ResizeHandle/ResizeHandle";
import {Panel, PanelGroup} from "react-resizable-panels";
import PageList from "../../components/PageList/PageList";
import {FileList} from "../../components/FileList/FileList";
import FooterSettings from "../../components/FooterSettings/FooterSettings";
import {Outlet} from "react-router-dom";

const initialData: todoType[] = [
    {
        "id": 1682057751986,
        "date": "2023-04-07T21:00:00.000Z",
        "timeStart": "2023-04-07T21:00:00.000Z",
        "timeEnd": "2023-04-07T21:00:00.000Z",
        "timer": 1,
        "title": "New todo",
        "text": "New todo",
        "pathMD": "New todo",
        "completed": false,
        "notifications": true,
        "delete": false,
        subTodo: [
            {
                id: 1,
                "date": "2023-04-07T21:00:00.000Z",
                "timeStart": "2023-04-07T21:00:00.000Z",
                "timeEnd": "2023-04-07T21:00:00.000Z",
                "timer": 1,
                "title": "іги ещвщ",
                "text": "New todo",
                "pathMD": "New todo",
                "completed": false,
                "notifications": true,
                "delete": false,
            }
        ]
    }
]

const Inbox = () => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState(initialData);
    const [selectedTask, setSelectedTask] = useState<todoType | null>(null);

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
            setTasks([...tasks, newTodo]);
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
    }, [newTask, tasks]);


    const handleTaskClick = (event: React.MouseEvent, task: todoType) => {
        event.stopPropagation();
        setSelectedTask(task);
    };

    const toggleComplete = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task));
    };


    return (
        <div className="container_inbox container_resize">
            <PanelGroup direction="horizontal">
                <Panel className="Panel" defaultSize={20} order={1}>
                    <div className="PanelContent">
                        <div className="left_container">
                            <h1>Inbox</h1>
                            <div className="wrapper_left_container">
                                <div>{t('sort')}</div>
                                <div>...</div>
                            </div>
                            <input
                                type="text"
                                placeholder="Нове завдання"
                                value={newTask}
                                onChange={handleNewTaskChange}
                            />
                            <button onClick={addTask}>Додати завдання</button>
                            <div>
                                {tasks.map((task: any) => (
                                    <Todo
                                        task={task}
                                        toggleComplete={toggleComplete}
                                        handleTaskClick={handleTaskClick}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </Panel>
                {selectedTask && (
                    <>
                        <ResizeHandle/>
                        <Panel className="Panel" order={12}>
                            <div className="PanelContent">
                                <div className="right_container"
                                >
                                    <h2>{selectedTask.title}</h2>
                                    <p>{selectedTask.text}</p>
                                    <div>
                                        {selectedTask.subTodo.map((subTask: any) => (
                                            <Todo
                                                task={subTask}
                                                toggleComplete={toggleComplete}
                                                handleTaskClick={handleTaskClick}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </>
                )}
            </PanelGroup>
        </div>
    );
};

export default Inbox;
