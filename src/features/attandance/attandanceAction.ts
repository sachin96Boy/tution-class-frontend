import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IgetStudentBasedOnScannedCode = {
    scanned_id: string
}

export type IgetCoursesBasedOnTime = {
    year: number;
    timestamp: Date;
}

export type IMarkAttandance = {
    student_id: string;
    course_id: string;
    date: Date;
}

const handleGetStudentDatabasedOnScannedId = async (values: IgetStudentBasedOnScannedCode, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'attandance/studentDataBasedOnScannedId',
            values
        );

        return response.data;


    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handlegetCourseDataBasedOnTime = async (values: IgetStudentBasedOnScannedCode, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'attandance/getCourseDataBasedOnTime',
            values
        );

        return response.data;


    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleMarkAttandance = async (values: IMarkAttandance, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'attandance/markAttandance',
            values
        );

        return response.data;


    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getStudentDatabasedOnScannedId = createAsyncThunk('attandannce/getStudentDataBasedOnScannedId', handleGetStudentDatabasedOnScannedId);
const getCourseDataBasedOnTime = createAsyncThunk('attandannce/getCourseDataBasedOnTime', handlegetCourseDataBasedOnTime);
const markAttandance = createAsyncThunk('attandannce/markAttandance', handleMarkAttandance);

export {
    getStudentDatabasedOnScannedId,
    getCourseDataBasedOnTime,
    markAttandance
}

