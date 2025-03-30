import { createSlice } from "@reduxjs/toolkit"
import { toaster } from "@/components/ui/toaster";


import { IUserInfo } from "../auth/authSlice";
import { getAllStudents } from "./studentAction";

export type IusersInitialState = {
    loading: boolean;
    students: Array<IUserInfo>;
    error: boolean | null;
    errorMsg: string;
    success: boolean;
}


const initialState: IusersInitialState = {
    loading: false,
    students: [],
    error: null,
    errorMsg: '',
    success: false
}

export const studentSlice = createSlice({
    name: 'student',
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(
            getAllStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload.students;
            }
        ).addCase(
            getAllStudents.rejected, (state, action) => {
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



export default studentSlice.reducer