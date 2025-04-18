import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

const handleGetAdditionalStudentData = async (value: IstudentIdProps,  { rejectWithValue }: any) => {
    try {

        const { enc_student_id } = value;

        const response = await axiosInstance.post(
            'student/getAdditionalStudentDataById',
            enc_student_id,
        );

        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getAllStudents = createAsyncThunk('student/getAllStudents', handleGetAllStudents);
const updateAdditionalStudentData = createAsyncThunk('student/updateAditionalStudentData', handleUpdateAdditionalData);
const getAdditionalStudentData = createAsyncThunk('student/getAdditionalStudentData', handleGetAdditionalStudentData);

export {
    getAllStudents,
    updateAdditionalStudentData,
    getAdditionalStudentData
}