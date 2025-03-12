import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "./authAction";

export type IinitialState = {
    loading: boolean;
    userInfo: object | null;
    token: string | null;
    error: string | null;
    success: boolean;

}

const initialState: IinitialState = {
    loading: false,
    userInfo: JSON.parse(`${localStorage.getItem("student")}`) || null,
    token: localStorage.getItem("token") || null,
    error: null,
    success: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.userInfo = null;
            state.token = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(
            registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            }
        ).addCase(
            registerUser.fulfilled, (state) => {
                state.loading = false
                state.error = null

            }
        ).addCase(
            registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || 'Registration Failed'
            }
        ).addCase(
            loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('student', action.payload.user);
            }
        ).addCase(
            loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || 'Login failed';
            }
        )
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer