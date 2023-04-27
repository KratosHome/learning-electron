import React, {useEffect, useRef, useState} from 'react';
import {todoType} from "../../types/todoType";
import Resize from "../../components/Resize/Resize";
import "./inbox.scss"

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
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    };


    const addTask = () => {
        if (newTask.trim()) {
            const newTodo: todoType = {
                id: Date.now(),
                date: new Date().toISOString(),
                timeStart: new Date().toISOString(),
                timeEnd: new Date().toISOString(),
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


    const handleTaskClick = (task: todoType) => {
        setSelectedTask(task);
    };

    return (
        <div className="container_inbox">
            <div className="left_container">
                <div>
                    <h1>Inbox</h1>
                    <div>sort</div>
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
                        <div key={task.id} onClick={() => handleTaskClick(task)}>
                            {task.title}
                        </div>
                    ))}
                </div>
            </div>
            <Resize sectionRef={sectionRef} minWidthPane2={1500}/>
            {selectedTask && (
                <div className="right_container">
                    <h2>{selectedTask.title}</h2>
                    <p>{selectedTask.text}</p>
                    <div>
                        {selectedTask.subTodo.map((subTask: any) => (
                            <div key={subTask.id}>{subTask.title}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inbox;
