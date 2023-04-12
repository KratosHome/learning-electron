import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Store from 'electron-store';

interface Todo {
    id: number;
    date: Date;
    text: string;
    completed: boolean;
}

const store = new Store();
const initialState: Todo[] = store.get('todos') as Todo[] || [];


const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.push(action.payload);
            store.set('todos', state);
        },
        updateTodo: (state, action: PayloadAction<Todo>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index] = action.payload;
            store.set('todos', state);
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            const newState = state.filter((todo) => todo.id !== action.payload);
            store.set('todos', newState);
            return newState;
        },
        toggleTodoCompletion: (state, action: PayloadAction<number>) => {
            const index = state.findIndex((todo) => todo.id === action.payload);
            state[index].completed = !state[index].completed;
            store.set('todos', state);
        },
    },
});

export const { addTodo, updateTodo, deleteTodo, toggleTodoCompletion } = todoSlice.actions;
export default todoSlice.reducer;
