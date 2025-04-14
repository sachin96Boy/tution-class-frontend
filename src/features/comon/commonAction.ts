import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IcreateGradeProps = {
    grade: string;
    grade_type: string;
}

export type IgradeProps = {
    id: string;
    grade_id: string;
    grade: string;
    grade_type: string
}
export type IcreateSubjectProps = {
    subject_name: string;
}

export type IsubjectProps = {
    id: string;
    subject_id: string;
    subject_name: string;
}
export type IcreateExpenceTypeProps = {
    expence_type: string;
}

export type IUpdateExpenceTypeProps = {
    id: string;
    expence_type: string;
}
export type IexpenceTypeProps = {
    id: string;
    expence_type: string;
}

const handleGetAllSubjects = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'common/getAllSubjects'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleGetAllExpenceTypes = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'account/getAllExpenceTypes'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleGetAllGrades = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'common/getAllGrades'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleCreateGrade = async (values: IcreateGradeProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'common/crateGrade',
            values,
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleCreateExpencetype = async (values: IcreateExpenceTypeProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'account/createExpenceType',
            values,
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleUpdateExpencetype = async (values: IUpdateExpenceTypeProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.put(
            'account/updateExpennceType',
            values,
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleCreateSubject = async (values: IcreateSubjectProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'common/crateSubject',
            values,
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getAllSubjects = createAsyncThunk('common/getAllSbjects', handleGetAllSubjects);
const getAllExpenceTypes = createAsyncThunk('common/getAllExpenceTypes', handleGetAllExpenceTypes);
const getAllGrades = createAsyncThunk('common/getAllGrades', handleGetAllGrades);
const createSubject = createAsyncThunk('common/createSubject', handleCreateSubject);
const createExpenceType = createAsyncThunk('common/createExpencetype', handleCreateExpencetype);
const updateExpenceType = createAsyncThunk('common/updateExpencetype', handleUpdateExpencetype);
const createGrade = createAsyncThunk('common/creategrade', handleCreateGrade);

export {
    getAllSubjects,
    getAllGrades,
    getAllExpenceTypes,
    createSubject,
    createGrade,
    createExpenceType,
    updateExpenceType

}