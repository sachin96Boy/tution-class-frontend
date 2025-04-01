import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IcreateCourseProps = {
    course_img: File | null;
    subject_id: string;
    grade_id: string;
    teacher_id: string;
    title: string;
    description: string;
    year: number;
}

export type IgetCourseProps = {
    course_id: string;
    course_img: string;
    course_img_path: string;
    subject_id: string;
    grade_id: string;
    teacher_id: string;
    title: string;
    description: string;
    year: number;
    status: boolean
}

const handleGetAllCourses = async (_: unknown, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'course/getAllcourses'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const handleCreateCourse = async (values: IcreateCourseProps, { rejectWithValue }: any) => {
    try {

        const { course_img, title, description, grade_id, subject_id, teacher_id, year } = values;

        const formData = new FormData();

        if (course_img != null) {
            formData.append("course_img", course_img);

        }


        formData.append("title", title.trim());
        formData.append("description", description.trim());
        formData.append("grade_id", grade_id);
        formData.append("subject_id", subject_id);
        formData.append("teacher_id", teacher_id);
        formData.append("year", year.toString());




        const response = await axiosInstance.post(
            'course/createCourse',
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

const getAllCourses = createAsyncThunk('course/getAllCourses', handleGetAllCourses);
const createCourse = createAsyncThunk('course/createCourse', handleCreateCourse);

export {
    getAllCourses,
    createCourse
}
