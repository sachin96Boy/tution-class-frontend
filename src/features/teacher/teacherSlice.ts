import { createSlice } from "@reduxjs/toolkit"
import { createTeacher, getAllTeachers, IteacherGetProps } from "./teacherAction";
import { toaster } from "@/components/ui/toaster";

export type IteachersInitialState = {
    loading: boolean;
    teachers: Array<IteacherGetProps>;
    error: boolean | null;
    errorMsg: string;
    success: boolean;
}

const initialState: IteachersInitialState = {
    loading: false,
    teachers: [],
    error: null,
    errorMsg: '',
    success: false
}

export const teacherSlice = createSlice({
    name: 'teacher',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getAllTeachers.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllTeachers.fulfilled, (state, action) => {
                state.loading = false;
                state.teachers = action.payload.teachers;
            }
        ).addCase(
            getAllTeachers.rejected, (state, action) => {
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
            createTeacher.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            createTeacher.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const newTeacher = action.payload.teacher;
                const teacherList = state.teachers;

                teacherList.push(newTeacher);

                state.teachers = teacherList;

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            createTeacher.rejected, (state, action) => {
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

export default teacherSlice.reducer