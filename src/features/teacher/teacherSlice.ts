import { createSlice } from "@reduxjs/toolkit"
import { createTeacher, getAllTeachers, getTeacherById, IteacherGetProps, updateTeacher } from "./teacherAction";
import { toaster } from "@/components/ui/toaster";

export type IteachersInitialState = {
    loading: boolean;
    teachers: Array<IteacherGetProps>;
    selectedTeacher: IteacherGetProps | null;
    error: boolean | null;
    errorMsg: string;
    success: boolean;
}

const initialState: IteachersInitialState = {
    loading: false,
    teachers: [],
    selectedTeacher: null,
    error: null,
    errorMsg: '',
    success: false
}

export const teacherSlice = createSlice({
    name: 'teacher',
    initialState: initialState,
    reducers: {
        applyAdvsearch(state, action) {
            const searchPhrase = action.payload;
            if (searchPhrase.trim() != '') {
                const searchTerm = searchPhrase.toLowerCase();

                const filteredData = state.teachers.filter(data => {
                    return data.full_name.toLowerCase().includes(searchTerm)
                })

                state.teachers = filteredData;
            }
        }
    },
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
        ).addCase(
            getTeacherById.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            getTeacherById.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const newTeacher = action.payload.teacher;

                state.selectedTeacher = newTeacher;

            }
        ).addCase(
            getTeacherById.rejected, (state, action) => {
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
            updateTeacher.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            updateTeacher.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const updatedTeacher = action.payload.teacher;

                let findex = state.teachers.findIndex((adv) => adv.id === updatedTeacher.id);

                if (findex !== -1) {
                    state.teachers[findex] = updatedTeacher;
                }

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            updateTeacher.rejected, (state, action) => {
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

export const { applyAdvsearch } = teacherSlice.actions;


export default teacherSlice.reducer