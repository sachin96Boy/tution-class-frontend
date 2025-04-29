import { createSlice } from "@reduxjs/toolkit";
import { editCompany, getCompanyDetails } from "./configAction";
import { toaster } from "@/components/ui/toaster";

export type IcompanyInfo = {
    id: string;
    name: string;
    code: string;
    address: string;
    email: string;
    logo: string;
    vatNo: string;
}
export type IEditcompanyInfo = {
    company_id: string;
    name: string;
    code: string;
    address: string;
    email: string;
    logo: string;
    vatNo: string;
}

export type IcompanyInitialState = {
    loading: boolean;
    company: IcompanyInfo | null;
    error: boolean | null;
    errorMsg: object;
    success: boolean;
}

const initialState: IcompanyInitialState = {
    loading: false,
    company: null,
    error: null,
    errorMsg: {},
    success: false
}

export const configSlice = createSlice({
    name: 'config',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getCompanyDetails.pending, (state) => {
                state.loading = true
                state.error = null
            }
        ).addCase(
            getCompanyDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload.company;

            }
        ).addCase(
            getCompanyDetails.rejected, (state, action) => {
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
            editCompany.pending, (state) => {
                state.loading = true
                state.error = null
            }
        ).addCase(
            editCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload.company;

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });

            }
        ).addCase(
            editCompany.rejected, (state, action) => {
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

export default configSlice.reducer;