import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";


const handleGetDashbboardStatistics = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'statistics/getDashboardStatistics'
        );


        return response.data;


    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleGetSalesOverviewOnYear = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'statistics/getSalesOverviewonYear'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleEarningAmongCourses = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'statistics/earningAmongCourses'
        );
        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getDashboardStatistics = createAsyncThunk('stat/getDashboardStatistics', handleGetDashbboardStatistics);
const getSalesOverviewOYear = createAsyncThunk('stat/getSalesOverviewOnYear', handleGetSalesOverviewOnYear);
const getEarningAmongCourses = createAsyncThunk('stat/getEarningAmongCourses', handleEarningAmongCourses);

export {
    getDashboardStatistics,
    getSalesOverviewOYear,
    getEarningAmongCourses
}
