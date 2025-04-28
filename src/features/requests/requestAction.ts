import axiosInstance from "@/utils/AxiosInstans";
import { IgetCourseProps } from "../course/courseAction";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IReqStudent = {
    student_id: string;
    full_name: string;
}

export type IreqGetData = {
    id: string;
    request_id: string;
    student_id: string,
    course_id: string,
    is_access_granted: boolean,
    request_status: string
    Course: IgetCourseProps
    Student: IReqStudent
}
export type IreqcourseAccess = {
    enc_request_id: string,
    user_id: string,
    approve_status: string
}

const handlegetRequestData = async (_: any, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'course/getAllRequestedCourses'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);

    }
}
const handlegrantCourseAccess = async (values: IreqcourseAccess, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'course/grantCourseAccess',
            values
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);

    }
}

const getRequestData = createAsyncThunk('request/getRequestData', handlegetRequestData);
const grantCourseAccess = createAsyncThunk('request/grantCourseAccess', handlegrantCourseAccess);

export {
    getRequestData,
    grantCourseAccess
}

