import { configureStore } from '@reduxjs/toolkit';
import recentMessagesReducer from './recentMessagesSlice'; 
import chatReducer from './chatSlice';

export const store = configureStore({
    reducer: {
        recentMessages: recentMessagesReducer,
        chat: chatReducer
    }
})