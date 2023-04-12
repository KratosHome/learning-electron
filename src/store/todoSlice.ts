import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [
        { id: 1, date: new Date(2023, 2, 15), text: 'Example todo 1' },
        { id: 2, date: new Date(2023, 2, 17), text: 'Example todo 2' },
    ],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index].date = action.payload.date;
            }
        },
    },
});

export const { addTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
