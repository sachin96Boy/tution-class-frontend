import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IcreateDailyPayments = {
    start_date: String;
    end_date: string;
    course_id: string
}
export type IcreateMonthlyPayments = {
    month: number;
    year: number
    course_id: string
}
export type IcreateDailyExpences = {
    start_date: String;
    end_date: string;
}
export type IcreateMonthlyExpences = {
    month: number;
    year: number
}
export type IcreateDailyAttandance = {
    date: String;
    course_id: string
}
export type IcreateMonthlyAttandance = {
    month: String;
    course_id: string
}

const handleGetDailyPayments = async (values: IcreateDailyPayments, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'report/dailypayments',
            values,
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleGetMonthlyPayments = async (values: IcreateMonthlyPayments, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'report/monthlypayments',
            values,
        );

        return response.data;

    } catch (err: any) {

        return rejectWithValue(err.response.data);
    }
}
const handleGetDailyExpences = async (values: IcreateDailyExpences, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'report/dailyexpences',
            values,
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleGetMonthlyExpences = async (values: IcreateMonthlyExpences, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'report/monthlyexpences',
            values,
        );

        return response.data;

    } catch (err: any) {
        console.log(err)
        return rejectWithValue(err.response.data);
    }
}
const handleGetDailyAttandance = async (values: IcreateDailyAttandance, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'report/dailyattandance',
            values,
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleGetMonthlyAttandance = async (values: IcreateMonthlyAttandance, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'report/monthlyattandance',
            values,
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getDailyPayments = createAsyncThunk('report/createDailyPayments', handleGetDailyPayments);
const getMonthlyPayments = createAsyncThunk('report/createMonthlyPayment', handleGetMonthlyPayments);
const getDailyExpences = createAsyncThunk('report/createDailyExpences', handleGetDailyExpences);
const getMonthlyExpences = createAsyncThunk('report/createMonthlyExpences', handleGetMonthlyExpences);
const getDailyAtandance = createAsyncThunk('report/createDailyAttandance', handleGetDailyAttandance);
const getMonthlyAttandance = createAsyncThunk('report/createMonthlyAttandance', handleGetMonthlyAttandance);

export {
    getDailyAtandance,
    getMonthlyAttandance,
    getDailyExpences,
    getMonthlyExpences,
    getDailyPayments,
    getMonthlyPayments
}
