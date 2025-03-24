import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit"

const handleGetCompanyDetails = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'config/getCompany'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getCompanyDetails = createAsyncThunk('config/getCompanyDetails', handleGetCompanyDetails);

export {
    getCompanyDetails
}