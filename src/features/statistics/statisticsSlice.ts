import { createSlice } from "@reduxjs/toolkit";
import { getDashboardStatistics } from "./statisticsAction";
import { toaster } from "@/components/ui/toaster";

type IdashboardProps = {
    todayIncome: string;
    todayIncomePresentage: string;
    todayStudents: string;
    attandancePresentage: string;
    newStudents: string;
    newStudentPresentage: string;
    todaySales: string;
    todaySalesPrecentage: string
}

export type IstatInitialState = {
    loading: boolean;
    dashboard: IdashboardProps | null;
    error: boolean | null;
    errorMsg: string | object;
    success: boolean;
}

const initialState: IstatInitialState = {
    loading: false,
    dashboard: null,
    error: null,
    errorMsg: '',
    success: false
}

export const statSlice = createSlice({
    name: 'stat',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getDashboardStatistics.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            getDashboardStatistics.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const result = action.payload.result;

                state.dashboard = result;


            }
        ).addCase(
            getDashboardStatistics.rejected, (state, action) => {
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

export default statSlice.reducer