import { createSlice } from "@reduxjs/toolkit";
import { createTimetable, createTimetableData, getAllTimeTableData, getTimeTableDataById, Igettimetableyear } from "./timetableAction";
import { toaster } from "@/components/ui/toaster";

type IcourseProps = {
    course_id: string;
    title: string;
    course_img_path: string;
}

export type Itimetabledata = {
    id: string;
    enc_timetable_id: string;
    start_time: string;
    end_time: string;
    day: string;
    course_id: string;
    Courses: Array<IcourseProps>
}


export type ItimetableInitialState = {
    loading: boolean;
    error: boolean | null;
    errorMsg: string | object | null;
    timeTables: Array<Igettimetableyear>;
    timeTableData: Array<Itimetabledata>;
    success: boolean;
}

const initialState: ItimetableInitialState = {
    loading: false,
    error: null,
    errorMsg: null,
    timeTables: [],
    timeTableData: [],
    success: false
}

export const timeTableSlice = createSlice({
    name: 'timeTable',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getAllTimeTableData.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllTimeTableData.fulfilled, (state, action) => {
                state.loading = false;
                state.timeTables = action.payload.timeTables;
            }
        ).addCase(
            getAllTimeTableData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;
            }
        ).addCase(
            createTimetable.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            createTimetable.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const newTimeTable = action.payload.timeTable;

                state.timeTables.push(newTimeTable);

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });

            }
        ).addCase(
            createTimetable.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg?.toString()
                })
            }
        ).addCase(
            createTimetableData.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            createTimetableData.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const newTimeTableData = action.payload.timeTableData;

                state.timeTableData.push(newTimeTableData);

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            createTimetableData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg?.toString()
                })
            }
        ).addCase(
            getTimeTableDataById.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getTimeTableDataById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.timeTableData = action.payload.timeTableData;
            }
        ).addCase(
            getTimeTableDataById.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg?.toString()
                })
            }
        )
    }
})

export default timeTableSlice.reducer;