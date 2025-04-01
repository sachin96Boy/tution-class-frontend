import { createSlice } from "@reduxjs/toolkit";
import { getAllTimeTableData } from "./timetableAction";

export type Itimetabledata = {
    start_time: string;
    end_time: string;
    day: string;
    course: string;
}

export type ITimeTableProps = {

    teacher: string;
    data: Array<Itimetabledata>;

}

export type ItimetableInitialState = {
    loading: boolean;
    error: boolean | null;
    errorMsg: string | object | null;
    timeTable: Array<ITimeTableProps>;
    success: boolean;
}

const initialState: ItimetableInitialState = {
    loading: false,
    error: null,
    errorMsg: null,
    timeTable: [],
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
                state.timeTable = action.payload.timeTable;
            }
        ).addCase(
            getAllTimeTableData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;
            }
        )
    }
})

export default timeTableSlice.reducer;