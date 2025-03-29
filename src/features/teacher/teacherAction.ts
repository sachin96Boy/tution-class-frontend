import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IteacherRegisterProps = {
    full_name: string;
    description: string;
    profileImg: File | null;
    introImg1: File | null;
    introImg2: File | null;
}
export type IteacherGetProps = {
    teacher_id: string;
    full_name: string;
    description: string;
    profileImg: string | null;
    introImg1: string | null;
    introImg2: string | null;
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

const handleCreteTeacher = async (values: IteacherRegisterProps, { rejectWithValue }: any) => {
    try {

        const { full_name, description, introImg1, introImg2, profileImg } = values;

        const formData = new FormData();

        if (introImg1 != null) {
            formData.append("introImg1", introImg1);

        }
        if (introImg2 != null) {
            formData.append("introImg2", introImg2);

        }
        if (profileImg != null) {
            formData.append("profileImg", profileImg);

        }


        formData.append("full_name", full_name);
        formData.append("description", description.trim());




        const response = await axiosInstance.post(
            'teacher/createTeacher',
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

const getAllTeachers = createAsyncThunk('teacher/getAllTeachers', handleGetAllTeachers);
const createTeacher = createAsyncThunk('teacher/createTeacher', handleCreteTeacher);

export {
    getAllTeachers,
    createTeacher
}


