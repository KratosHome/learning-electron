import React, {useEffect, useRef, useState} from 'react';
import {todoType} from "../../types/todoType";
import "./inbox.scss"
import Todo from "../../components/UI/todo/Todo";
import ResizeHandle from "../../components/UI/ResizeHandle/ResizeHandle";
import {Panel, PanelGroup} from "react-resizable-panels";
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import AddTodo from "../../components/AddTodo/AddTodo";
import SortTodos from '../../components/SortTodos/SortTodos';

const Inbox = () => {

    const [selectedTask, setSelectedTask] = useState<todoType | null>(null);
    const {todos, todosComplete, todosDelete} = useSelector((state: RootState) => state.todo);

    const handleTaskClick = (event: React.MouseEvent, task: todoType,) => {
        setSelectedTask(task);
    };

    const toggleComplete = (id: number) => {
        //   setTasks(todos.map(task => task.id === id ? {...task, completed: !task.completed} : task));
    };


    const toggleSubComplete = (id: number) => {
        /*
                setTasks(todos.map(task => {
                    return {...task,
                        subTodo: task.subTodo.map(subTask => subTask.id === id ? {
                            ...subTask,
                            completed: !subTask.completed
                        } : subTask)
                    };
                }));
         */
    };

    return (
        <div className="container_inbox container_resize">
            <PanelGroup direction="horizontal">
                <Panel className="Panel" defaultSize={20} order={1}>
                    <div className="PanelContent">
                        <div className="left_container">
                            <h1>Inbox</h1>
                            <SortTodos/>
                            <AddTodo/>
                            {todos.map((task: any) => (
                                <Todo
                                    key={task.id}
                                    task={task}
                                    toggleComplete={toggleComplete}
                                    handleTaskClick={handleTaskClick}
                                />
                            ))}
                            <div>Виконані</div>
                            {todosComplete.map((task: any) => (
                                <Todo
                                    key={task.id}
                                    task={task}
                                    toggleComplete={toggleComplete}
                                    handleTaskClick={handleTaskClick}
                                />
                            ))}
                            <div>Видалені</div>
                            {todosDelete.map((task: any) => (
                                <Todo
                                    key={task.id}
                                    task={task}
                                    toggleComplete={toggleComplete}
                                    handleTaskClick={handleTaskClick}
                                />
                            ))}
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
                                    <div>
                                        {selectedTask.subTodo.map((subTask: any) => (
                                            <Todo
                                                key={subTask.id}
                                                task={subTask}
                                                toggleComplete={toggleSubComplete}
                                                handleTaskClick={handleTaskClick}
                                                isSub={true}
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
