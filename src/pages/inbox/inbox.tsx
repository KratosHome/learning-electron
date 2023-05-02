import React, {useEffect, useState} from 'react';
import {todoType} from "../../types/todoType";
import "./inbox.scss"
import Todo from "../../components/UI/todo/Todo";
import ResizeHandle from "../../components/UI/ResizeHandle/ResizeHandle";
import {Panel, PanelGroup} from "react-resizable-panels";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import AddTodo from "../../components/AddTodo/AddTodo";
import SortTodos from '../../components/SortTodos/SortTodos';
import {setSelectedTask} from '../../store/todoSlice';

const Inbox = () => {
    const dispatch = useDispatch();
    const {todos, todosComplete, todosDelete, selectedTask} = useSelector((state: RootState) => state.todo);

    const handleTaskClick = (event: React.MouseEvent, task: todoType) => {
        dispatch(setSelectedTask(task));
    };

    const closeRightContainer = () => {
        dispatch(setSelectedTask(null));
    }
    useEffect(() => {
        if (selectedTask) {
            const updatedTask = todos.find((todo) => todo.id === selectedTask.id);
            if (updatedTask) {
                dispatch(setSelectedTask(updatedTask));
            }
        }
    }, [todos, selectedTask, dispatch]);

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
                                    handleTaskClick={handleTaskClick}
                                />
                            ))}
                            <div>Виконані</div>
                            {todosComplete.map((task: any) => (
                                <Todo
                                    key={task.id}
                                    task={task}
                                    handleTaskClick={handleTaskClick}
                                    isComplete={true}
                                />
                            ))}
                            <div>Видалені</div>
                            {todosDelete.map((task: any) => (
                                <Todo
                                    key={task.id}
                                    task={task}
                                    handleTaskClick={handleTaskClick}
                                    isDelete={true}
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
                                    <AddTodo
                                        todoId={selectedTask.id}
                                        isSub={true}
                                    />
                                    <h2>{selectedTask.title}</h2>
                                    <div>
                                        {selectedTask.subTodo.map((subTask: any) => (
                                            <Todo
                                                key={subTask.id}
                                                task={subTask}
                                                handleTaskClick={handleTaskClick}
                                                isSub={true}
                                            />
                                        ))}
                                    </div>
                                    <div onClick={closeRightContainer}>
                                        close
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
