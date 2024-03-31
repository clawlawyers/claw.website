import { createSlice } from "@reduxjs/toolkit";

export const SidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        collapsed: false
    },

    reducers: {
        toggle(state) {
            state.collapsed = !state.collapsed;
        },
        collapse(state) {
            state.collapsed = true;
        },
        expand(state) {
            state.collapsed = false;
        }
    }
});

export const { toggle, collapse, expand } = SidebarSlice.actions;

export default SidebarSlice.reducer;