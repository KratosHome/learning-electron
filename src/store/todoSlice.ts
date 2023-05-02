import {createSlice} from '@reduxjs/toolkit';
import {todoType} from "../types/todoType";

// todoType
const initialState: {
    todos: todoType[],
    todosComplete: todoType[],
    todosDelete: todoType[],
    selectedTask: null | todoType
} = {
    todos: [],
    todosComplete: [],
    todosDelete: [],
    selectedTask: null,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        initTodos: (state, action) => {
            state.todos = action.payload.todos;
            state.todosComplete = action.payload.todosComplete;
            state.todosDelete = action.payload.todosDelete;
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload;
        },
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        addSubTodo: (state, action) => {
            const { todoId, subTodo } = action.payload;
            const todo = state.todos.find((todo) => todo.id === todoId);
            if (todo) {
                todo.subTodo.push(subTodo);
            }
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex(
                (todo) => todo.id === action.payload.id
            );
            if (index !== -1) {
                state.todos[index].date = action.payload.date;
            }
        },
        completeTodo: (state, action) => {
            const todoToRedoComplete = state.todos.find(
                (todo) => todo.id === action.payload.id
            );
            if (todoToRedoComplete) {
                todoToRedoComplete.completed = true;
                state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
                state.todosComplete.push(todoToRedoComplete);
            }
        },
        uncompletedTodo: (state, action) => {
            const todoToUncomplete = state.todosComplete.find(
                (todo) => todo.id === action.payload.id
            );
            if (todoToUncomplete) {
                todoToUncomplete.completed = false;
                state.todosComplete = state.todosComplete.filter((todo) => todo.id !== action.payload.id);
                state.todos.push(todoToUncomplete);
            }
        },
        deleteTodo: (state, action) => {
            const todoToComplete = state.todos.find(
                (todo) => todo.id === action.payload.id
            );
            if (todoToComplete) {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
                state.todosDelete.push(todoToComplete);
            }
        },
        removeTodo: (state, action) => {
            const todoToComplete = state.todos.find(
                (todo) => todo.id === action.payload.id
            );
            if (todoToComplete) {
                state.todosDelete = state.todos.filter((todo) => todo.id !== action.payload.id);
            }
        },
    },
});

export const {
    initTodos,
    setSelectedTask,
    addTodo,
    addSubTodo,
    updateTodo,
    completeTodo,
    uncompletedTodo,
    deleteTodo,
    removeTodo
} = todoSlice.actions;

export default todoSlice.reducer;
