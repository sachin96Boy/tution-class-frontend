import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Itimetabledata } from "./timeTableSlice";

export type Itimetableyear = {
    year: Date | null;
}
export type ItimetablebyId = {
    enc_timetable_id: string | null;
}
export type Igettimetableyear = {
    id: string;
    time_table_id: string;
    year: number;
}


const handleGetAllTimetableData = async (_: unknown, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'timetable/getAllTimeTables',
        );
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const handleCreateTimetable = async (values: Itimetableyear, { rejectWithValue }: any) => {
    try {

        const { year } = values;

        const yearData = year?.getFullYear() || null;

        const response = await axiosInstance.post(
            'timetable/createTimeTable',
            { "yearData": yearData },

        );
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleCreateTimetableData = async (values: Itimetabledata, { rejectWithValue }: any) => {
    try {

        const { enc_timetable_id, course, day, start_time, end_time } = values;

        const response = await axiosInstance.post(
            'timetable/createTimeTableData',
            values,

        );
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleGetTimetableDatabyTID = async (values: ItimetablebyId, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'timetable/getTimetableDataByTimeTableId',
            values,

        );
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getAllTimeTableData = createAsyncThunk('timetable/getAllTimetableData', handleGetAllTimetableData);
const createTimetable = createAsyncThunk('timetable/createTimetable', handleCreateTimetable);
const createTimetableData = createAsyncThunk('timetable/createTimetableData', handleCreateTimetableData);
const getTimeTableDataById = createAsyncThunk('timetable/gettimetabledatabyid', handleGetTimetableDatabyTID);

export {
    getAllTimeTableData,
    createTimetable,
    createTimetableData,
    getTimeTableDataById
}