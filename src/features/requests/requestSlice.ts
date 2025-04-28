import { createSlice } from "@reduxjs/toolkit";
import { getRequestData, grantCourseAccess, IreqGetData } from "./requestAction";
import { toaster } from "@/components/ui/toaster";

export type IrequestInitialState = {
    loading: boolean;
    requests: Array<IreqGetData>;
    error: boolean | null;
    errorMsg: object | string;
    success: boolean;
}

const initialState: IrequestInitialState = {
    loading: false,
    requests: [],
    error: null,
    errorMsg: {},
    success: false
}

export const requestSlice = createSlice({
    name: 'request',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getRequestData.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getRequestData.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                state.requests = action.payload.requestedCourses;
            }
        ).addCase(
            getRequestData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;


                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg.toString()
                });
            }
        ).addCase(
            grantCourseAccess.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            grantCourseAccess.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                const updatedRequest = action.payload.request;
                console.log(updatedRequest);
                let findex = state.requests.findIndex((courseData) => courseData.id === updatedRequest.id);

                if (findex !== -1) {
                    state.requests[findex] = updatedRequest;
                }

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });


            }
        ).addCase(
            grantCourseAccess.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;


                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg.toString()
                });
            }
        )
    },
});

export default requestSlice.reducer