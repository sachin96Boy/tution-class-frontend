import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IListItemProp } from "../config/configAction";

export type IcreateCourseProps = {
    title: string;
    description: string;
    subject_id: IListItemProp;
    grade_id: IListItemProp;
    teacher_id: IListItemProp;
    course_img: File | null;
    year: number;
}
export type IUpdateCourseProps = {
    enc_course_id: string;
    title: string;
    description: string;
    subject_id: IListItemProp;
    grade_id: IListItemProp;
    teacher_id: IListItemProp;
    course_img: File | null;
    year: number;
}
export type IcreateCourseDataProps = {
    enc_course_id: string | null;
    title: string;
    course_month: string;
    course_content: string;
    course_video: string;
    date: null | Date
    course_attachment: File | null;
}
export type IUpdateCourseDataProps = {
    courseData_id: string;
    enc_course_id: string | null;
    title: string;
    course_month: string;
    course_content: string;
    course_video: string;
    date: null | Date
    course_attachment: File | null;
}

export type ITeacherProps = {
    teacher_id: string;
    full_name: string;
    profile_img: string;
}

export type ISubjectProps = {
    subject_id: string;
    subject_name: string;
}
export type IGradeProps = {
    grade_id: string;
    grade: string;
}


export type IgetCourseProps = {
    id: string;
    course_id: string;
    course_img: string;
    course_img_path: string;
    subject_id: string;
    grade_id: string;
    teacher_id: string;
    Teacher: ITeacherProps;
    Subject: ISubjectProps;
    Grade: IGradeProps;
    title: string;
    description: string;
    year: number;
    status: boolean
}

export type IgetCourseDataProps = {
    id: string;
    enc_course_id: string;
    title: string;
    course_month: string;
    course_contnt: string;
    Course_video: string;
    course_attachment: string;
    date: string;
}

export type IstudentCourses = {
    enc_student_id: string;
}

type getCourseDataByIdProps = {
    enc_course_id: string
}
type getisCourseRequestedbyIdProps = {
    enc_course_id: string
    enc_student_id: string
}
export type getCourseDataByTeacherandSubjectProps = {
    teacher_id: IListItemProp
    subject_id: IListItemProp
    year: string
}

const handleGetCourseDataByCourseId = async (values: getCourseDataByIdProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'course/getCourseDataByCourseId',
            values
        );
        return response.data;

    } catch (err: any) {

        return rejectWithValue(err.response.data);
    }
}
const handleRequestCourseAccess = async (values: getisCourseRequestedbyIdProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'course/requestCourseAccess',
            values
        );

        return response.data;

    } catch (err: any) {

        return rejectWithValue(err.response.data);
    }
}
const handleCheckAccessedCoursebyCourseId = async (values: getisCourseRequestedbyIdProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'course/checkAccessedCoursebyCourseId',
            values
        );

        return response.data;

    } catch (err: any) {

        return rejectWithValue(err.response.data);
    }
}
const handleGetCourseByCourseId = async (values: getCourseDataByIdProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'course/getCourseByCourseId',
            values
        );

        return response.data;

    } catch (err: any) {
        console.log(err);

        return rejectWithValue(err.response.data);
    }
}
const handleGetStudentCourseDataByCourseId = async (values: getCourseDataByIdProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'course/getStudentCourseDataByCourseId',
            values
        );

        return response.data;

    } catch (err: any) {

        return rejectWithValue(err.response.data);
    }
}
const handleGetCourseDataByTeacherandSubject = async (values: getCourseDataByTeacherandSubjectProps, { rejectWithValue }: any) => {
    try {

        const { subject_id, teacher_id, year } = values;

        const dataObj = {
            'enc_teacher_id': teacher_id.key,
            'subject_id': subject_id.key,
            'year': year
        }

        const response = await axiosInstance.post(
            'course/getCourseDataByTeacherandSubject',
            dataObj
        );

        return response.data;

    } catch (err: any) {

        return rejectWithValue(err.response.data);
    }
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
const handleGetStudentCourses = async (values: IstudentCourses, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'course/getStudentCourses',
            values
        );

        return response.data;

    } catch (err: any) {
        console.log(err);
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


        formData.append("subject_id", subject_id.key);
        formData.append("title", title.trim());
        formData.append("grade_id", grade_id.key);
        formData.append("enc_teacher_id", teacher_id.key);
        formData.append("description", description.trim());
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
        console.log(err);
        return rejectWithValue(err.response.data);
    }
}
const handleUpdateCourse = async (values: IUpdateCourseProps, { rejectWithValue }: any) => {
    try {

        const { enc_course_id, course_img, title, description, grade_id, subject_id, teacher_id, year } = values;

        const formData = new FormData();

        if (course_img != null) {
            formData.append("course_img", course_img);

        }


        formData.append("enc_course_id", enc_course_id);
        formData.append("subject_id", subject_id.key);
        formData.append("grade_id", grade_id.key);
        formData.append("enc_teacher_id", teacher_id.key);
        formData.append("title", title.trim());
        formData.append("description", description.trim());
        formData.append("year", year.toString());




        const response = await axiosInstance.put(
            'course/updateCourse',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

        );


        return response.data;


    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
}
const handleCreateCourseData = async (values: IcreateCourseDataProps, { rejectWithValue }: any) => {
    try {

        const { date, title, course_attachment, course_content, course_month, course_video, enc_course_id } = values;

        const formData = new FormData();

        if (course_attachment != null) {
            formData.append("course_attachment", course_attachment);

        }

        if (enc_course_id != null) {

            formData.append("enc_course_id", enc_course_id);
        }
        formData.append("course_content", course_content.trim());
        if (date != null) {

            formData.append("date", date?.toLocaleString());
        }
        formData.append("title", title);
        formData.append("course_month", course_month);
        formData.append("course_video", course_video.trim());




        const response = await axiosInstance.post(
            'course/creteCourseData',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

        );



        return response.data;

    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
}
const handleUpdateCourseData = async (values: IUpdateCourseDataProps, { rejectWithValue }: any) => {
    try {

        const { courseData_id, title, date, course_attachment, course_content, course_month, course_video, enc_course_id } = values;

        const formData = new FormData();

        if (course_attachment != null) {
            formData.append("course_attachment", course_attachment);

        }

        if (enc_course_id != null) {

            formData.append("enc_course_id", enc_course_id);
        }
        formData.append("courseData_id", courseData_id);
        formData.append("title", title);
        if (date != null) {

            formData.append("date", date.toLocaleString());
        }
        formData.append("course_content", course_content.trim());
        formData.append("course_month", course_month);
        formData.append("course_video", course_video.trim());




        const response = await axiosInstance.put(
            'course/updateCourseData',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

        );



        return response.data;

    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
}

const getAllCourses = createAsyncThunk('course/getAllCourses', handleGetAllCourses);
const getStudentCourses = createAsyncThunk('course/getStudentCourses', handleGetStudentCourses);
const getcoursebyCourseId = createAsyncThunk('course/getCourseByCourseId', handleGetCourseByCourseId);
const requestCourseAccess = createAsyncThunk('course/requestCourseAccess', handleRequestCourseAccess);
const checkAccessedCoursebyCourseId = createAsyncThunk('course/checkAccessedCoursebyCourseId', handleCheckAccessedCoursebyCourseId);
const getcourseDatabyCourseId = createAsyncThunk('course/getCourseDataByCourseId', handleGetCourseDataByCourseId);
const getStudentcourseDatabyCourseId = createAsyncThunk('course/getStudentCourseDataByCourseId', handleGetStudentCourseDataByCourseId);
const getcourseDatabyTeacherandSubject = createAsyncThunk('course/getCourseDataByTeacherandSubject', handleGetCourseDataByTeacherandSubject);
const createCourse = createAsyncThunk('course/createCourse', handleCreateCourse);
const updateCourse = createAsyncThunk('course/updateCourse', handleUpdateCourse);
const createCourseData = createAsyncThunk('course/createCourseData', handleCreateCourseData);
const updateCourseData = createAsyncThunk('course/updateCourseData', handleUpdateCourseData);

export {
    getAllCourses,
    createCourse,
    createCourseData,
    updateCourseData,
    getcourseDatabyCourseId,
    getStudentCourses,
    getcourseDatabyTeacherandSubject,
    getStudentcourseDatabyCourseId,
    checkAccessedCoursebyCourseId,
    getcoursebyCourseId,
    requestCourseAccess,
    updateCourse
}
