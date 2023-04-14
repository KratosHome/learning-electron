import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './todoSlice';
import { Middleware } from '@reduxjs/toolkit';

const electronStoreMiddleware: Middleware = (storeApi) => (next) => async (action) => {
    const result = next(action);
    const state = storeApi.getState();
    await window.storeAPI.setValue('todos', state.todo.todos);
    return result;
};

export const store = configureStore({
    reducer: {
        todo: todoSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(electronStoreMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

