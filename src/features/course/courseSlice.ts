import { createSearchParams } from "react-router-dom";
import { getAllCourses, IgetCourseProps } from "./courseAction";
import { createSlice } from "@reduxjs/toolkit";
import { toaster } from "@/components/ui/toaster";

export type ICourseInitialState = {
    loading: boolean;
    courses: Array<IgetCourseProps>;
    error: boolean | null;
    errorMsg: string;
    success: boolean;
}

const initialState: ICourseInitialState = {
    loading: false,
    courses: [],
    error: null,
    errorMsg: '',
    success: false
}

export const courseSlie = createSlice({
    name: 'course',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getAllCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload.courses;
            }
        ).addCase(
            getAllCourses.rejected, (state, action) => {
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

export default courseSlie.reducer