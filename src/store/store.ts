import { configureStore, ThunkMiddleware } from '@reduxjs/toolkit';
import fileSlice from './fileSlice';
import todoSlice from './todoSlice';

const electronStoreMiddleware: ThunkMiddleware = (storeApi) => (next) => async (action) => {
    const result = next(action);
    const state = storeApi.getState();
    await window.storeAPI.setValue('todos', state.todo.todos);
    await window.storeAPI.setValue('files', state.files.files.patch);
    return result;
};

export const store = configureStore({
    reducer: {
        todo: todoSlice,
        files: fileSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(electronStoreMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

