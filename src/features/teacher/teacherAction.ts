import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IteacherRegisterProps = {
    full_name: string;
    description: string;
    profile_img: File | null;
    intro_img1: File | null;
    intro_img2: File | null;
}
export type IteacherGetProps = {
    teacher_id: string;
    full_name: string;
    description: string;
    profile_img: string | null;
    intro_img1: string | null;
    intro_img2: string | null;
}

const handleGetAllTeachers = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'teacher/getAllTeachers'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getAllTeachers = createAsyncThunk('teacher/getAllTeachers', handleGetAllTeachers);

export {
    getAllTeachers
}


