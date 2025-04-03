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
const getAllGrades = createAsyncThunk('common/getAllGrades', handleGetAllGrades);
const createSubject = createAsyncThunk('common/createSubject', handleCreateSubject);
const createGrade = createAsyncThunk('common/creategrade', handleCreateGrade);

export {
    getAllSubjects,
    getAllGrades,
    createSubject,
    createGrade
}