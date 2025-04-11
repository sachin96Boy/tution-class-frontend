import { createSlice } from "@reduxjs/toolkit";
import { getDashboardStatistics, getEarningAmongCourses, getSalesOverviewOYear } from "./statisticsAction";
import { toaster } from "@/components/ui/toaster";

type IdashboardProps = {
    todayIncome: string | null;
    todayIncomePresentage: string;
    todayStudents: string;
    attandancePresentage: string;
    newStudents: string;
    newStudentPresentage: string;
    todaySales: string;
    todaySalesPrecentage: string
}

type IcourseProps = {
    course_id: string;
    title: string;
    course_img_path: string;
}

export type IsalesOverview = {
    month: number,
    total_amount: number
}
export type IearningOnsalesOverview = {
    course_id: string,
    Course: IcourseProps,
    month: number,
    total_amount: number
}

export type IstatInitialState = {
    loading: boolean;
    dashboard: IdashboardProps | null;
    salesOverviewYearly: Array<IsalesOverview>;
    earningAmongCourses: Array<IearningOnsalesOverview>;
    error: boolean | null;
    errorMsg: string | object;
    success: boolean;
}

const initialState: IstatInitialState = {
    loading: false,
    dashboard: null,
    salesOverviewYearly: [],
    earningAmongCourses: [],
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
        ).addCase(
            getSalesOverviewOYear.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            getSalesOverviewOYear.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const result = action.payload.monthlyPayments;

                state.salesOverviewYearly = result;


            }
        ).addCase(
            getSalesOverviewOYear.rejected, (state, action) => {
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
            getEarningAmongCourses.pending, (state) => {
                state.loading = true
                state.error = false
            }
        ).addCase(
            getEarningAmongCourses.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const earnings = action.payload.earningAmongCourses;

                state.earningAmongCourses = earnings;


            }
        ).addCase(
            getEarningAmongCourses.rejected, (state, action) => {
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