import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

const handleGetAllUsers = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'user/getAllUsers'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getAllUsers = createAsyncThunk('user/getAllUsers', handleGetAllUsers);

export {
    getAllUsers
}