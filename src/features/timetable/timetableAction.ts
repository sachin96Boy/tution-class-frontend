import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITimeTableProps } from "./timeTableSlice";


const handleGetAllTimetableData = async (_: unknown, { rejectWithValue }: any) => {
    try {
        const currentYear = new Date().getFullYear();
        const response = await axiosInstance.post(
            'timetable/getAllTimetableData',
            { currentYear }
        );
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const handleCreateTimetable = async (values: ITimeTableProps, { rejectWithValue }: any) => {
    try {

        const { teacher, data } = values;

        const formData = new FormData();

        formData.append("teacher", teacher);
        formData.append("data", JSON.stringify(data));

        const response = await axiosInstance.post(
            'timetable/createTimetable',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getAllTimeTableData = createAsyncThunk('timetable/getAllTimetableData', handleGetAllTimetableData);
const createTimetable = createAsyncThunk('timetable/createTimetable', handleCreateTimetable);

export {
    getAllTimeTableData,
    createTimetable
}