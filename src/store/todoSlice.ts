import {createSlice} from '@reduxjs/toolkit';
import {todoType} from "../types/todoType";

// todoType
const initialState: {
    todos: todoType[],
    todosComplete: todoType[],
    todosDelete: todoType[]
} = {
    todos: [],
    todosComplete: [],
    todosDelete: [],
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
        addTodo: (state, action) => {
            state.todos.push(action.payload);
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
            const todoToComplete = state.todos.find(
                (todo) => todo.id === action.payload.id
            );
            if (todoToComplete) {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
                state.todosComplete.push(todoToComplete);
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
    },
});

export const {initTodos, addTodo, updateTodo, completeTodo, deleteTodo} = todoSlice.actions;

export default todoSlice.reducer;
