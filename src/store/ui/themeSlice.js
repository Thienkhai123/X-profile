import {createSlice} from '@reduxjs/toolkit';

export const theme = createSlice({
    name: 'theme',
    initialState: 'light',
    reducers: {
        toogle: (state) => {
            if (state === 'light') {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
                state = 'dark';
                return state;
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                state = 'light';
                return state;
            }
        },
    },
});

export const {toogle} = theme.actions;

export default theme.reducer;