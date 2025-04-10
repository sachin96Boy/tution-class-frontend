import { createAsyncThunk } from "@reduxjs/toolkit";
import { IListItemProp } from "../config/configAction";
import axiosInstance from "@/utils/AxiosInstans";

type IcourseProps = {
    course_id: string;
    title: string;
    course_img_path: string;
}

type IStudentProp = {
    student_id: string,
    full_name: string,
}

export type ICreateAssignment ={
    title: string;
    description: string;
    file: File | null;
    course_id: IListItemProp
}
export type ICreateAssignmentData ={
    assignment_id: string | null;
    student_id: IListItemProp;
    marks: string;
}

export type IAssignmentProps = {
    id: string;
    assignment_id: string;
    title: string;
    description: string;
    file:string;
    course_id: string;
    Course: IcourseProps
}
export type IAssignmentDataProps = {
    id: string;
    assignment_id: string;
    student_id: string;
    marks: string;
    Student: IStudentProp

}

export type IassignmentbyId = {
    enc_assignment_id: string | null;
}

const handleGetAllAssignmentData = async (_: unknown, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'assignment/getAllAssignments',
        );
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const handleCreateAssignment = async (values: ICreateAssignment, { rejectWithValue }: any) => {
    try {

        const { course_id, description, file, title } = values;

        const formData = new FormData();

        if(file != null){
            formData.append('file', file)
        }

        formData.append("title", title);
        formData.append("description", description);
        formData.append("enc_course_id", course_id.key);


        const response = await axiosInstance.post(
            'assignment/createAssignment',
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
const handleCreateAssignmentData = async (values: ICreateAssignmentData, { rejectWithValue }: any) => {
    try {

        const { assignment_id, marks, student_id } = values;

        const response = await axiosInstance.post(
            'assignment/createAssignmentData',
            {
                "enc_student_id": student_id.key,
                "marks": marks,
                "enc_assignment_id": assignment_id,
            },

        );
        return response.data;
    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
}
const handleGetAssignmentDatabyAID = async (values: IassignmentbyId, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'assignment/getAssignmentbyId',
            values,

        );
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getAllAssignmentData = createAsyncThunk('assignment/getAllAssignmenteData', handleGetAllAssignmentData);
const createAssignment = createAsyncThunk('assignment/createAssignment', handleCreateAssignment);
const createAssignmentData = createAsyncThunk('assignment/createAssignmentData', handleCreateAssignmentData);
const getAssignmentDataById = createAsyncThunk('assignment/getAssignmentdatabyid', handleGetAssignmentDatabyAID);

export {
    getAllAssignmentData,
    createAssignment,
    createAssignmentData,
    getAssignmentDataById
}