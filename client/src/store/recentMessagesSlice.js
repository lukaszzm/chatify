import { createSlice } from "@reduxjs/toolkit";

const recentMessagesSlice = createSlice({
    name: 'recentMessages',
    initialState: {
        messages: [],
    },
    reducers: {
        initMessages: (state, action) => {
            state.messages = action.payload;
        },
        addRecentMessage: (state, action) => {
            const newMessages = state.messages.filter(
                (el) => el.userInfo[0]._id !== action.payload.userInfo[0]._id
              );
            newMessages.unshift(action.payload);
            state.messages = newMessages;
        }
    }
})

export const { addRecentMessage, initMessages } = recentMessagesSlice.actions;
export default recentMessagesSlice.reducer;