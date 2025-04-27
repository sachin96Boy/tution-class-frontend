import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStudentUserEditProps } from "../auth/authAction";
import { string } from "yup";

type IstudentProps = {
    student_id: string;
    full_name: string;
    isVerified: boolean
}

export type IUpdateStudentAdditionalDataProps = {
    enc_student_id: string;
    school: string;
    examAttempt: string;
    examYear: string;
    district: string;
    city: string;
    nic: string;
    address: string;
    mobileNumber1: string;
    mobileNumber2: string;
    profileImage: File | null;
}
export type IStudentAdditionalData = {
    id: string;
    student_id: string;
    exam_attempt: string;
    district: string;
    nic: string;
    school: string;
    exam_year: string;
    profile_image: string;
    city: string;
    address: string;
    mobile1: string;
    mobile2: string;
    Student: IstudentProps
}

export type INicData = {
    id: string;
    student_id: string;
    nic_front: string;
    nic_back: string;
    nic_selfie: string;
    is_verified: boolean;
}

export type IstudentIdProps = {
    enc_student_id: string
}

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

const handleUpdateAdditionalData = async (value: IUpdateStudentAdditionalDataProps, { rejectWithValue }: any) => {
    try {

        const { enc_student_id, school, examAttempt, examYear, district, city, nic, address, mobileNumber1, mobileNumber2, profileImage } = value;

        const formData = new FormData();

        if (profileImage != null) {
            formData.append("profileImage", profileImage);

        }


        formData.append("school", school.trim());
        formData.append("enc_student_id", enc_student_id.trim());
        formData.append("examAttempt", examAttempt.trim());
        formData.append("examYear", examYear.trim());
        formData.append("district", district.trim());
        formData.append("city", city.trim());
        formData.append("nic", nic.trim());
        formData.append("address", address.trim());
        formData.append("mobileNumber1", mobileNumber1.trim());
        formData.append("mobileNumber2", mobileNumber2.trim());

        const response = await axiosInstance.put(
            'student/updateAdditionalData',
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
const handleUpdateStudentData = async (value: IStudentUserEditProps, { rejectWithValue }: any) => {
    try {

        const { email, fullName, student_id } = value;

        const dataObj = {
            enc_student_id: student_id,
            email: email,
            full_name: fullName
        }

        const response = await axiosInstance.put(
            'student/updateStudent',
            dataObj,
        );

        return response.data;


    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const handle_student_change_status = async (values: IstudentIdProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'student/changeStudentStatus',
            values
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const handleGetStudentDataById = async (value: IstudentIdProps, { rejectWithValue }: any) => {
    try {
        const response = await axiosInstance.post(
            'student/getStudentbyId',
            value,
        );

        return response.data;
    } catch (err: any) {

        return rejectWithValue(err.response.data);
    }
}
const handleGetAdditionalStudentData = async (value: IstudentIdProps, { rejectWithValue }: any) => {
    try {
        const response = await axiosInstance.post(
            'student/getAdditionalStudentDataById',
            value,
        );

        return response.data;
    } catch (err: any) {

        return rejectWithValue(err.response.data);
    }
}
const handleGetNicData = async (value: IstudentIdProps, { rejectWithValue }: any) => {
    try {
        const response = await axiosInstance.post(
            'student/getNicDataByStudentId',
            value,
        );

        return response.data;
    } catch (err: any) {

        return rejectWithValue(err.response.data);
    }
}
const handleNICStatusChange = async (value: IstudentIdProps, { rejectWithValue }: any) => {
    try {
        const response = await axiosInstance.post(
            'student/nicStatusChange',
            value,
        );

        return response.data;
    } catch (err: any) {

        return rejectWithValue(err.response.data);
    }
}

const getAllStudents = createAsyncThunk('student/getAllStudents', handleGetAllStudents);
const updateStudentData = createAsyncThunk('student/updateStudentData', handleUpdateStudentData);
const changeStudentStatus = createAsyncThunk('student/changeStudentStatus', handle_student_change_status);
const getStudentDataById = createAsyncThunk('student/getStudentDatabyId', handleGetStudentDataById);
const updateAdditionalStudentData = createAsyncThunk('student/updateAditionalStudentData', handleUpdateAdditionalData);
const getAdditionalStudentData = createAsyncThunk('student/getAdditionalStudentData', handleGetAdditionalStudentData);
const getNicData = createAsyncThunk('student/getnicData', handleGetNicData);
const changeNicStatus = createAsyncThunk('student/changenicStatus', handleNICStatusChange);

export {
    getAllStudents,
    updateAdditionalStudentData,
    getAdditionalStudentData,
    updateStudentData,
    changeStudentStatus,
    getStudentDataById,
    getNicData,
    changeNicStatus
}