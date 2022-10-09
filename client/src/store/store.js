import { configureStore } from '@reduxjs/toolkit';
import recentMessagesReducer from './recentMessagesSlice'; 
import chatReducer from './chatSlice';
import notesReducer from './notesSlice';

export const store = configureStore({
    reducer: {
        recentMessages: recentMessagesReducer,
        chat: chatReducer,
        notes: notesReducer,
    }
})