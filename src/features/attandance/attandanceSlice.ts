import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo } from "../auth/authSlice";
import { IgetCourseProps } from "../course/courseAction";
import { getCourseDataBasedOnTime, getStudentDatabasedOnScannedId, markAttandance } from "./attandanceAction";
import { toaster } from "@/components/ui/toaster";

export type IAttandanceInnitialState = {
    loading: boolean;
    courses: Array<IgetCourseProps>;
    studennt: IUserInfo | null;
    error: boolean | null;
    errorMsg: string | object;
    success: boolean;
}

const initialState: IAttandanceInnitialState = {
    loading: false,
    courses: [],
    studennt: null,
    error: null,
    errorMsg: '',
    success: false
}

export const attandanceSlice = createSlice({
    name: 'attadance',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {

        builder.addCase(
            getStudentDatabasedOnScannedId.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            getStudentDatabasedOnScannedId.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true;

                const studentData = action.payload.studentData;

                state.studennt = studentData;

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            getStudentDatabasedOnScannedId.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg
                });
            }
        ).addCase(
            getCourseDataBasedOnTime.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            getCourseDataBasedOnTime.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true;

                const studentData = action.payload.studentData;

                state.studennt = studentData;

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            getCourseDataBasedOnTime.rejected, (state, action) => {
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
        .addCase(
            markAttandance.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            markAttandance.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true;

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            markAttandance.rejected, (state, action) => {
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