import { createSlice } from "@reduxjs/toolkit";
import { createAssignment, createAssignmentData, getAllAssignmentData, getAssignmentDataById, IAssignmentDataProps, IAssignmentProps } from "./assignmentAction";
import { toaster } from "@/components/ui/toaster";


export type IAssignmentInitialState = {
    loading: boolean;
    error: boolean | null;
    errorMsg: string | object | null;
    assignments: Array<IAssignmentProps>;
    assignmentData: Array<IAssignmentDataProps>;
    success: boolean;
}

const initialState: IAssignmentInitialState = {
    loading: false,
    error: null,
    errorMsg: null,
    assignments: [],
    assignmentData: [],
    success: false
}

export const assignmentSlice = createSlice({
    name: 'assignment',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getAllAssignmentData.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllAssignmentData.fulfilled, (state, action) => {
                state.loading = false;
                state.assignments = action.payload.assignments;

            }
        ).addCase(
            getAllAssignmentData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;
            }
        ).addCase(
            createAssignment.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            createAssignment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const newAssignment = action.payload.assignment;

                state.assignments.push(newAssignment);

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });

            }
        ).addCase(
            createAssignment.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg?.toString()
                })
            }
        ).addCase(
            createAssignmentData.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            createAssignmentData.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const newAssignmentData = action.payload.assignmentData;

                state.assignmentData.push(newAssignmentData);

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            createAssignmentData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg?.toString()
                })
            }
        ).addCase(
            getAssignmentDataById.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAssignmentDataById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.assignmentData = action.payload.assignmentData;
            }
        ).addCase(
            getAssignmentDataById.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg?.toString()
                })
            }
        )
    },
});

export default assignmentSlice.reducer;