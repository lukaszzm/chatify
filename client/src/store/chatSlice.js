import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        _id: null,
        userInfo: {
            firstName: null,
            lastName: null,
            profileImage: null
        },
        messages: []
    },
    reducers: {
        initMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setId: (state, action) => {
            state._id = action.payload;
        }
    }
})

export const { initMessages, addMessage, setId, setUserInfo } = chatSlice.actions;
export default chatSlice.reducer;