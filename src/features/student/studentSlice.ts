import { createSlice } from "@reduxjs/toolkit"
import { toaster } from "@/components/ui/toaster";


import { IUserInfo } from "../auth/authSlice";
import { changeNicStatus, changeStudentStatus, getAdditionalStudentData, getAllStudents, getNicData, getStudentDataById, INicData, IStudentAdditionalData, updateAdditionalStudentData, updateStudentData } from "./studentAction";

export type IusersInitialState = {
    loading: boolean;
    students: Array<IUserInfo>;
    student: IUserInfo | null;
    additionalStudentData: IStudentAdditionalData | null;
    studentNicData: INicData | null;
    error: boolean | null;
    errorMsg: string;
    success: boolean;
}


const initialState: IusersInitialState = {
    loading: false,
    students: [],
    student: null,
    additionalStudentData: null,
    studentNicData: null,
    error: null,
    errorMsg: '',
    success: false
}

export const studentSlice = createSlice({
    name: 'student',
    initialState: initialState,
    reducers: {
        applyAdvsearch(state, action) {
            const searchPhrase = action.payload;
            if (searchPhrase.trim() != '') {
                const searchTerm = searchPhrase.toLowerCase();

                const filteredData = state.students.filter(data => {
                    return data.full_name.toLowerCase().includes(searchTerm)
                })

                state.students = filteredData;
            }
        }
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
        ).addCase(
            getNicData.pending, (state) => {
                state.loading = true
                state.error = null
            }
        ).addCase(
            getNicData.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const nicData = action.payload.studentNicData
                state.studentNicData = nicData

            }
        ).addCase(
            getNicData.rejected, (state, action) => {
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
            getStudentDataById.pending, (state) => {
                state.loading = true
                state.error = null
            }
        ).addCase(
            getStudentDataById.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const nicData = action.payload.nicData
                state.studentNicData = nicData

            }
        ).addCase(
            getStudentDataById.rejected, (state, action) => {
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
            changeNicStatus.pending, (state) => {
                state.loading = true
                state.error = null
            }
        ).addCase(
            changeNicStatus.fulfilled, (state, action) => {
                state.loading = false
                state.error = false

                const student = action.payload.student
                state.student = student

            }
        ).addCase(
            changeNicStatus.rejected, (state, action) => {
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

export const { applyAdvsearch } = studentSlice.actions;


export default studentSlice.reducer