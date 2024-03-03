import profileSlice from './profileSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({ 
    reducer: {
        profile: profileSlice,
    },
});

export default store;