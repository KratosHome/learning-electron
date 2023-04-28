import React, {useEffect, useRef, useState} from 'react';
import {todoType} from "../../types/todoType";
import Resize from "../../components/Resize/Resize";
import "./inbox.scss"
import {t} from 'i18next';
import Todo from "../../components/UI/todo/Todo";

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


    const minWidthPane = 100;
    const maxWidthPane = window.innerWidth - minWidthPane;

    const useResizeInbox = (minWidth: number) => {
        const sectionRef = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            const handleResize = () => {
                const maxWidth = window.innerWidth - minWidth;
                if (sectionRef.current) {
                    sectionRef.current.style.maxWidth = `${maxWidth}px`;
                }
            };

            window.addEventListener("resize", handleResize);
            handleResize();

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, [minWidth]);

        return sectionRef;
    };

    const sectionRef = useResizeInbox(minWidthPane);

    return (
        <div className="container_inbox">
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
            <Resize sectionRef={sectionRef} minWidthPane2={100}/>
            {selectedTask && (
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
            )}
        </div>
    );
};

export default Inbox;
