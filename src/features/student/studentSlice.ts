import { createSlice } from "@reduxjs/toolkit"
import { toaster } from "@/components/ui/toaster";


import { IUserInfo } from "../auth/authSlice";
import { changeStudentStatus, getAdditionalStudentData, getAllStudents, IStudentAdditionalData, updateAdditionalStudentData, updateStudentData } from "./studentAction";

export type IusersInitialState = {
    loading: boolean;
    students: Array<IUserInfo>;
    additionalStudentData: IStudentAdditionalData | null;
    error: boolean | null;
    errorMsg: string;
    success: boolean;
}


const initialState: IusersInitialState = {
    loading: false,
    students: [],
    additionalStudentData: null,
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
        ).addCase(
            updateAdditionalStudentData.pending, (state) => {
                state.loading = true
                state.error = null
            }
        ).addCase(
            updateAdditionalStudentData.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                state.success = true
                state.additionalStudentData = action.payload.studentData

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            updateAdditionalStudentData.rejected, (state, action) => {
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
            getAdditionalStudentData.pending, (state) => {
                state.loading = true
                state.error = null
            }
        ).addCase(
            getAdditionalStudentData.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                state.additionalStudentData = action.payload.studentData
            }
        ).addCase(
            getAdditionalStudentData.rejected, (state, action) => {
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
            updateStudentData.pending, (state) => {
                state.loading = true
                state.error = null
            }
        ).addCase(
            updateStudentData.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const updatedStudent = action.payload.student


                let findex = state.students.findIndex((adv) => adv.id === updatedStudent.id);

                if (findex !== -1) {
                    state.students[findex] = updatedStudent;
                }

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            updateStudentData.rejected, (state, action) => {
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
            changeStudentStatus.pending, (state) => {
                state.loading = true
                state.error = null
            }
        ).addCase(
            changeStudentStatus.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const updatedStudent = action.payload.student


                let findex = state.students.findIndex((adv) => adv.id === updatedStudent.id);

                if (findex !== -1) {
                    state.students[findex] = updatedStudent;
                }

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            changeStudentStatus.rejected, (state, action) => {
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