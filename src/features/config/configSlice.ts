import { createSlice } from "@reduxjs/toolkit";
import { getCompanyDetails } from "./configAction";

type IcompanyInfo = {
    id: number;
    name: string;
    code: string;
    address: string;
    email: string;
    logo: string;
}

export type IcompanyInitialState = {
    loading: boolean;
    company: Array<IcompanyInfo>;
    error: boolean | null;
    errorMsg: string;
    success: boolean;
}

const initialState: IcompanyInitialState = {
    loading: false,
    company: [],
    error: null,
    errorMsg: '',
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
                state.company = action.payload.companies;
                
            }
        ).addCase(
            getCompanyDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMsg = (action.payload as any).error || ''
            }
        )
    },
});

export default configSlice.reducer;