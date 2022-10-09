import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
    },
    reducers: {
        initNotes: (state, action) => {
            state.notes = action.payload;
        },
        addNote: (state, action) => {
            const updatedNotes = [action.payload, ...state.notes];
            state.notes = updatedNotes;
        }
    }
})

export const { addNote, initNotes } = notesSlice.actions;
export default notesSlice.reducer;