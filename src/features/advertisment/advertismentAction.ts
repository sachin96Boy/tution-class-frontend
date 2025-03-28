import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IcreateAdvertismentProps = {
    file_name: File | null;
    amount: number;
}
export type IgetCompnyBanerProps = {
    enc_company_id: string
}

const handleGetAllAdvertiments = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'advertisment/getAllAdvertisments'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleCreatAdvertisment = async (values: IcreateAdvertismentProps, { rejectWithValue }: any) => {
    try {

        const { amount, file_name } = values;

        const formData = new FormData();

        if (file_name != null) {
            formData.append("file_name", file_name);

        }


        formData.append("duration", amount.toString());




        const response = await axiosInstance.post(
            'advertisment/createAdvertisment',
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
const handlegetCompanyMainBanner = async (values: IgetCompnyBanerProps, { rejectWithValue }: any) => {
    try {

        const {enc_company_id} = values;

        const response = await axiosInstance.post(
            'config/getDashboardAdvertisment',
            enc_company_id,
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getAllAdvertisments = createAsyncThunk('advertisment/getAllAdvertisments', handleGetAllAdvertiments);
const createAdvertisment = createAsyncThunk('advertisment/createAdvertisment', handleCreatAdvertisment);
const getCompanyMainBanner = createAsyncThunk('advertisment/getCompanyMainBanner', handlegetCompanyMainBanner);

export {
    getAllAdvertisments,
    createAdvertisment,
    getCompanyMainBanner
}