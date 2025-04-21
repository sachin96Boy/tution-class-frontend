import { createSlice } from "@reduxjs/toolkit";
import { getDailyAtandance, getDailyExpences, getDailyPayments, getMonthlyAttandance, getMonthlyExpences, getMonthlyPayments } from "./reportAction";
import { toaster } from "@/components/ui/toaster";
import { IExpenceType, IgetExpence, IgetPayment } from "../accounting/accountingAction";
import { IgetCourseProps, ITeacherProps } from "../course/courseAction";
import { IstudentIdProps } from "../student/studentAction";

type IStudentProp = {
    student_id: string,
    full_name: string,
}

type IgetMonthlyPayReport = {
    Course: IgetCourseProps;
    Student: IStudentProp;
    course_id: string;
    student_id: string;
    month: number;
    total_amount: number;
}
type IgetMonthlyExpReport = {
    Teacher: ITeacherProps,
    Expencetype: IExpenceType
    expence_type: string,
    teacher_id: string,
    month: number,
    amount: number
}

export type IreportInitialState = {
    loading: boolean;
    dailyPayments: Array<IgetPayment>;
    monthlyPayments: Array<IgetMonthlyPayReport>;
    dailyExpences: Array<IgetExpence>;
    monthlyExpences: Array<IgetMonthlyExpReport>;
    dailyAttandance: Array<any>;
    monthlyAttandance: Array<any>;
    error: boolean | null;
    errorMsg: string | object;
    success: boolean;

}

const initialState: IreportInitialState = {
    loading: false,
    dailyPayments: [],
    monthlyPayments: [],
    dailyExpences: [],
    monthlyExpences: [],
    dailyAttandance: [],
    monthlyAttandance: [],
    error: null,
    errorMsg: '',
    success: false
}

export const reportSlice = createSlice({
    name: 'report',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getDailyPayments.pending, (state) => {
                state.loading = true;
                state.error = false
            }
        ).addCase(
            getDailyPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null

                const dailyPayments = action.payload.dailyPayments

                state.dailyPayments = dailyPayments;
            }
        ).addCase(
            getDailyPayments.rejected, (state, action) => {
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
            getMonthlyPayments.pending, (state) => {
                state.loading = true;
                state.error = false
            }
        ).addCase(
            getMonthlyPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null

                const monthlyPayments = action.payload.monthlyPayments

                state.monthlyPayments = monthlyPayments;
            }
        ).addCase(
            getMonthlyPayments.rejected, (state, action) => {
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
            getDailyExpences.pending, (state) => {
                state.loading = true;
                state.error = false
            }
        ).addCase(
            getDailyExpences.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null

                const dailyexpences = action.payload.dailyExpences

                state.dailyExpences = dailyexpences;
            }
        ).addCase(
            getDailyExpences.rejected, (state, action) => {
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
            getMonthlyExpences.pending, (state) => {
                state.loading = true;
                state.error = false
            }
        ).addCase(
            getMonthlyExpences.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null

                const monthlyExpence = action.payload.monthlyexpences

                state.monthlyExpences = monthlyExpence;
            }
        ).addCase(
            getMonthlyExpences.rejected, (state, action) => {
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
            getDailyAtandance.pending, (state) => {
                state.loading = true;
                state.error = false
            }
        ).addCase(
            getDailyAtandance.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null

                const dailyAttandance = action.payload.dailyAttandance

                state.dailyAttandance = dailyAttandance;
            }
        ).addCase(
            getDailyAtandance.rejected, (state, action) => {
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
            getMonthlyAttandance.pending, (state) => {
                state.loading = true;
                state.error = false
            }
        ).addCase(
            getMonthlyAttandance.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null

                const monthlyAttandance = action.payload.monthlyAttandance

                state.monthlyAttandance = monthlyAttandance;
            }
        ).addCase(
            getMonthlyAttandance.rejected, (state, action) => {
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
})

export default reportSlice.reducer