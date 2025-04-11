import { createSlice } from "@reduxjs/toolkit"
import { toaster } from "@/components/ui/toaster";
import { ICoporateUserInfo } from "../auth/authSlice";
import { getAllUsers } from "./userAction";
import { registerCoporateUser } from "../auth/authAction";

export type IusersInitialState = {
    loading: boolean;
    users: Array<ICoporateUserInfo>;
    error: boolean | null;
    errorMsg: string;
    success: boolean;
}


const initialState: IusersInitialState = {
    loading: false,
    users: [],
    error: null,
    errorMsg: '',
    success: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        userAdded(state, action) {
            state.users.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder.addCase(
            getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
            }
        ).addCase(
            getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg
                });
            }
        ).addCase(
            registerCoporateUser.fulfilled, (state, action) => {

                const newUser = action.payload.user;

                state.users.push(newUser);
            }
        )

    },
});

export const { userAdded } = userSlice.actions;

export default userSlice.reducer