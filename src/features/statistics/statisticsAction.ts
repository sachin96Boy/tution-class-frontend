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

const getDashboardStatistics = createAsyncThunk('stat/getDashboardStatistics', handleGetDashbboardStatistics);

export{
    getDashboardStatistics
}
