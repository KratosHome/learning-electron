import { createSlice } from '@reduxjs/toolkit';

interface ITodo {
    id: number;
    date: Date;
    text: string;
    done?: boolean
    time?: any
}

const initialState: { todos: ITodo[] } = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        initTodos: (state, action) => {
            state.todos = action.payload;
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
    },
});

export const { initTodos, addTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
