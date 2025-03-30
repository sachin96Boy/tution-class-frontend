import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

const handleGetAllStudents = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'student/getAllStudents'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getAllStudents = createAsyncThunk('student/getAllStudents', handleGetAllStudents);

export {
    getAllStudents
}