import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk, AsyncThunkPayloadCreator } from "@reduxjs/toolkit"


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

const getCompanyDetails = createAsyncThunk('config/getCompanyDetails', handleGetCompanyDetails);

export {
    getCompanyDetails
}