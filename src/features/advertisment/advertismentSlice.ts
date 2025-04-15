import { createSlice } from "@reduxjs/toolkit";
import { changeAdStatus, createAdvertisment, getAllAdvertisments, getCompanyMainBanner, updateAdvertisment } from "./advertismentAction";
import { toaster } from "@/components/ui/toaster";
import { act } from "react";

export type Iadvertisment = {
    id: string,
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
    reducers: {
        applyAdvsearch(state, action) {
            const searchPhrase = action.payload;
            if (searchPhrase.trim() != '') {
                const searchTerm = searchPhrase.toLowerCase();

                const filteredData = state.advertisments.filter(data => {
                    return data.duration.toLowerCase().includes(searchTerm)
                })

                state.advertisments = filteredData;
            }
        }
    },
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

                const newAd = action.payload.advertisment;

                state.advertisments.push(newAd);

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
        ).addCase(
            updateAdvertisment.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            updateAdvertisment.fulfilled, (state, action) => {
                state.loading = false;
                const updatedAd = action.payload.advertisment;

                let findex = state.advertisments.findIndex((adv) => adv.id === updatedAd.id);

                if (findex !== -1) {
                    state.advertisments[findex] = updatedAd;
                }

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });

            }
        ).addCase(
            updateAdvertisment.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            }
        ).addCase(
            changeAdStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            changeAdStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedAd = action.payload.advertisment;

                let findex = state.advertisments.findIndex((adv) => adv.id === updatedAd.id);

                if (findex !== -1) {
                    state.advertisments[findex] = updatedAd;
                }

            }
        ).addCase(
            changeAdStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            }
        )
    },
});

export const { applyAdvsearch } = advertismentSlice.actions;

export default advertismentSlice.reducer