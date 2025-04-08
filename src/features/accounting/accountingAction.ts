import axiosInstance from "@/utils/AxiosInstans";
import { IListItemProp } from "../config/configAction"
import { ITeacherProps } from "../course/courseAction";
import { createAsyncThunk } from "@reduxjs/toolkit";

type IExpenceType = {
    expence_type: string,
}
type IStudentProp = {
    student_id: string,
    full_name: string,
}

type IcourseProps = {
    course_id: string;
    title: string;
    course_img_path: string;
}


export type ICreatePayment = {
    student_id: IListItemProp,
    course_id: IListItemProp,
    paid_amount: number,
    date: Date | null
}
export type IgetPayment = {
    id: string,
    payment_id: string,
    student_id: string,
    course_id: string,
    paid_amount: number,
    Student: IStudentProp,
    Course: IcourseProps
    date: string
}

export type ICreateExpence = {
    expence_type: IListItemProp,
    teacher_id: IListItemProp,
    expence_amount: number,
    date: Date| null
}
export type IgetExpence = {
    id: string,
    expence_id: string,
    expence_type: string,
    teacher_id: string,
    expence_amount: number,
    date: string,
    Teacher: ITeacherProps,
    Expencetype: IExpenceType
}

const handleCreatePayment = async (values: ICreatePayment, { rejectWithValue }: any) => {
    try {

        const dataObj = {
            enc_student_id: values.student_id.key,
            enc_course_id: values.course_id.key,
            paid_amount: values.paid_amount,
            date: values.date
        }

        const response = await axiosInstance.post(
            'account/createPayment',
            dataObj,
        );



        return response.data;

    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
}
const handleCreateExpence = async (values: ICreateExpence, { rejectWithValue }: any) => {
    try {

        const dataObj = {
            expence_type: values.expence_type.key,
            enc_teacher_id: values.teacher_id.key,
            expence_amount: values.expence_amount,
            date: values.date
        }

        const response = await axiosInstance.post(
            'account/createExpence',
            dataObj,
        );



        return response.data;

    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
}
const handlegetAllPayments = async (values: unknown, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'account/getAllPayments',
        );



        return response.data;

    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
}
const handlegetAllExpences = async (values: unknown, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'account/getAllExpences',
        );



        return response.data;

    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
}

const createPayment = createAsyncThunk('account/createPayment', handleCreatePayment);
const createExpence = createAsyncThunk('account/createExpence', handleCreateExpence);
const getAllPayments = createAsyncThunk('account/getAllPayments', handlegetAllPayments);
const getAllExpences = createAsyncThunk('account/getAllExpences', handlegetAllExpences);

export {
    createPayment,
    createExpence,
    getAllPayments,
    getAllExpences
}


