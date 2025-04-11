import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser, loginCoporateUser, registerCoporateUser } from "./authAction";
import { toaster } from "@/components/ui/toaster";




export type IUserInfo = {
    id: number
    student_id: string;
    full_name: string;
    email: string;
    isVerified: boolean;
    pay_role: string;
}
export type ICoporateUserInfo = {
    id: number
    user_id: string;
    email: string;
    userName: string;
    isVerified: boolean;
    user_role_id: string;
}

export type IinitialState = {
    loading: boolean;
    userInfo: IUserInfo | null;
    coporateInfo: ICoporateUserInfo | null;
    token: string | null;
    error: boolean | null;
    errorMsg: object | string;
    success: boolean;

}

const initialState: IinitialState = {
    loading: false,
    userInfo: JSON.parse(`${localStorage.getItem("student")}`) || null,
    coporateInfo: JSON.parse(`${localStorage.getItem("coporate")}`) || null,
    token: localStorage.getItem("token") || null,
    error: null,
    errorMsg: '',
    success: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('student');
            localStorage.removeItem('coporate');
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
            registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = null



                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });

            }
        ).addCase(
            registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg.toString()
                });
            }
        ).addCase(
            registerCoporateUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            registerCoporateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            registerCoporateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg.toString()
                });
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
                localStorage.setItem('student', JSON.stringify(action.payload.user));

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                })
            }
        ).addCase(
            loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg.toString()
                });
            }
        ).addCase(
            loginCoporateUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            loginCoporateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.coporateInfo = action.payload.user;
                state.token = action.payload.token;

                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('coporate', JSON.stringify(action.payload.user));


                toaster.create({
                    type: 'success',
                    title: action.payload.message
                })

            }
        ).addCase(
            loginCoporateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg.toString()
                });
            }
        )
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer