import { boolean } from "yup";
import { createGrade, createSubject, getAllGrades, getAllSubjects, IgradeProps, IsubjectProps } from "./commonAction";
import { createSlice } from "@reduxjs/toolkit";
import { toaster } from "@/components/ui/toaster";

export type IcommonInitialState = {
    loading: boolean;
    subjects: Array<IsubjectProps>;
    grades: Array<IgradeProps>;
    error: boolean | null;
    errorMsg: string | object;
    success: boolean;
}

const initialState: IcommonInitialState = {
    loading: false,
    subjects: [],
    grades: [],
    error: null,
    errorMsg: '',
    success: false
}

export const commonSlice = createSlice({
    name: 'common',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            createGrade.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            createGrade.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const newGrade = action.payload.grade;

                state.grades.push(newGrade);

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            createGrade.rejected, (state, action) => {
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
            getAllGrades.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllGrades.fulfilled, (state, action) => {
                state.loading = false;
                state.grades = action.payload.grades;
            }
        ).addCase(
            getAllGrades.rejected, (state, action) => {
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
            createSubject.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            createSubject.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const newSub = action.payload.subject;
                state.subjects.push(newSub);


                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            createSubject.rejected, (state, action) => {
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
            getAllSubjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllSubjects.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects = action.payload.subjects;
            }
        ).addCase(
            getAllSubjects.rejected, (state, action) => {
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

export default commonSlice.reducer