import { boolean } from "yup";
import { createExpenceType, createGrade, createSubject, getAllExpenceTypes, getAllGrades, getAllSubjects, IexpenceTypeProps, IgradeProps, IsubjectProps } from "./commonAction";
import { createSlice } from "@reduxjs/toolkit";
import { toaster } from "@/components/ui/toaster";

export type IcommonInitialState = {
    loading: boolean;
    subjects: Array<IsubjectProps>;
    grades: Array<IgradeProps>;
    expenceTypes: Array<IexpenceTypeProps>
    error: boolean | null;
    errorMsg: string | object;
    success: boolean;
}

const initialState: IcommonInitialState = {
    loading: false,
    subjects: [],
    grades: [],
    expenceTypes: [],
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
        ).addCase(
            createExpenceType.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            createExpenceType.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const expenceType = action.payload.expencetype;
                state.expenceTypes.push(expenceType);


                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            createExpenceType.rejected, (state, action) => {
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
            getAllExpenceTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllExpenceTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.expenceTypes = action.payload.expenceTypes;
            }
        ).addCase(
            getAllExpenceTypes.rejected, (state, action) => {
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