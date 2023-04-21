import {createSlice} from '@reduxjs/toolkit';

interface filesType {
    patch: string
}

const initialState: { files: filesType } = {
    files: {
        patch: "",
    },
};

const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setFilePath: (state, action) => {
            state.files.patch = action.payload;
        },
    },
});

export const {setFilePath} = fileSlice.actions;

export default fileSlice.reducer;
