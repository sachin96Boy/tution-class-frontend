import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk, AsyncThunkPayloadCreator } from "@reduxjs/toolkit"
import { IEditcompanyInfo } from "./configSlice";



export type IListItemProp = {
    key: string;
    value: string;
    image_path: string | null
}

const handleGetCompanyDetails: AsyncThunkPayloadCreator<any, void> = async (_, { rejectWithValue }) => {
    try {

        const response = await axiosInstance.get(
            'config/getCompany'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleEditCompanyData = async (values: IEditcompanyInfo, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.put(
            'config/updateCompany',
            values
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getCompanyDetails = createAsyncThunk('config/getCompanyDetails', handleGetCompanyDetails);
const editCompany = createAsyncThunk('config/editCompany', handleEditCompanyData);

export {
    getCompanyDetails,
    editCompany
}