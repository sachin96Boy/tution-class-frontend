import { createSlice } from "@reduxjs/toolkit"
import { toaster } from "@/components/ui/toaster";
import { ICoporateUserInfo } from "../auth/authSlice";
import { getAllUsers, reset_password, updateUser } from "./userAction";
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
        },
        applyAdvsearch(state, action) {
            const searchPhrase = action.payload;
            if (searchPhrase.trim() != '') {
                const searchTerm = searchPhrase.toLowerCase();

                const filteredData = state.users.filter(data => {
                    return data.userName.toLowerCase().includes(searchTerm)
                })

                state.users = filteredData;
            }
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
        ).addCase(
            updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const user = action.payload.user;

                let findex = state.users.findIndex((adv) => adv.id === user.id);

                if (findex !== -1) {
                    state.users[findex] = user;
                }

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            updateUser.rejected, (state, action) => {
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
            reset_password.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            reset_password.fulfilled, (state, action) => {
                state.loading = false;
                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            reset_password.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg
                });
            }
        )

    },
});

export const { userAdded, applyAdvsearch } = userSlice.actions;

export default userSlice.reducer