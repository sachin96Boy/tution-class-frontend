import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit"

const handleGetCompanyDetails = async () => {
    try {

        const response = await axiosInstance.get(
            'connfig/getCompany'
        );

        return response.data;

    } catch (err) {
        throw err;
    }
}

const getCompanyDetails = createAsyncThunk('config/getCompanyDetails', handleGetCompanyDetails);

export {
    getCompanyDetails
}