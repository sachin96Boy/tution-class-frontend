import { createSlice } from "@reduxjs/toolkit";
import { createAdvertisment, getAllAdvertisments, getCompanyMainBanner } from "./advertismentAction";
import { toaster } from "@/components/ui/toaster";

export type Iadvertisment = {
    advertisment_id: string;
    file_name: string;
    advertisment_img_path
    : string;
    duration: string;
    status: boolean;
}

export type IadvertismentInitilState = {
    loading: boolean;
    advertisments: Array<Iadvertisment>;
    companyMainAd: Iadvertisment | null;
    error: boolean | null;
    errorMsg: string;
    success: boolean;
}

const initialState: IadvertismentInitilState = {
    loading: false,
    advertisments: [],
    companyMainAd: null,
    error: null,
    errorMsg: '',
    success: false
}

export const advertismentSlice = createSlice({
    name: 'advertisment',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            createAdvertisment.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            createAdvertisment.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            createAdvertisment.rejected, (state, action) => {
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
            getAllAdvertisments.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllAdvertisments.fulfilled, (state, action) => {
                state.loading = false;
                state.advertisments = action.payload.advertisments;
            }
        ).addCase(
            getAllAdvertisments.rejected, (state, action) => {
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
            getCompanyMainBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getCompanyMainBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.companyMainAd = action.payload.advertisment;
            }
        ).addCase(
            getCompanyMainBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            }
        )
    },
});

export default advertismentSlice.reducer