import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IteacherRegisterProps = {
    full_name: string;
    description: string;
    profileImg: File | null;
    introImg1: File | null;
    introImg2: File | null;
}
export type IteacherEditFormProps = {
    teacher_id: string;
    full_name: string;
    description: string;
    profileImg: File | null;
    introImg1: File | null;
    introImg2: File | null;
}
export type IteacherGetProps = {
    id: string;
    teacher_id: string;
    full_name: string;
    description: string;
    profile_img: string;
    intro_image1: string;
    intro_image2: string;
}

type getTeacherByIdProps = {
    enc_teacher_id: string
}

const handleGetTeacherById = async (values: getTeacherByIdProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'teacher/getTeacherbyId',
            values
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
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
const handleUpdateTeacher = async (values: IteacherEditFormProps, { rejectWithValue }: any) => {
    try {

        const { teacher_id, full_name, description, introImg1, introImg2, profileImg } = values;

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


        formData.append("teacher_id", teacher_id);
        formData.append("full_name", full_name);
        formData.append("description", description.trim());




        const response = await axiosInstance.put(
            'teacher/updateTeacher',
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
const updateTeacher = createAsyncThunk('teacher/updateTeacher', handleUpdateTeacher);
const getTeacherById = createAsyncThunk('teacher/getTeacherById', handleGetTeacherById);

export {
    getAllTeachers,
    createTeacher,
    getTeacherById,
    updateTeacher
}


