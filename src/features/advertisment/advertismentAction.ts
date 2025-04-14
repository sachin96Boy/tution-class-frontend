import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IcreateAdvertismentProps = {
    file_name: File | null;
    amount: string;
}
export type IUpdateAdvertismentProps = {
    advertisment_id: string
    file_name: File | null;
    amount: string;
}
export type IgetCompnyBanerProps = {
    enc_company_id: string
}
export type IUpdateAdStatusProps = {
    advertisment_id: string
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


        formData.append("duration", amount);




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
const handleUpdateAdvertisment = async (values: IUpdateAdvertismentProps, { rejectWithValue }: any) => {
    try {

        const { amount, file_name, advertisment_id } = values;

        const formData = new FormData();

        if (file_name != null) {
            formData.append("file_name", file_name);

        }


        formData.append("duration", amount);
        formData.append("advertisment_id", advertisment_id);




        const response = await axiosInstance.put(
            'advertisment/updateAdvertisment',
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
const handleChangeAdStatus = async (values: IUpdateAdStatusProps, { rejectWithValue }: any) => {
    try {


        const response = await axiosInstance.post(
            'advertisment/changeStatus',
            values,

        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handlegetCompanyMainBanner = async (values: IgetCompnyBanerProps, { rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.post(
            'config/getMainAdvertisment',
            values,
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getAllAdvertisments = createAsyncThunk('advertisment/getAllAdvertisments', handleGetAllAdvertiments);
const createAdvertisment = createAsyncThunk('advertisment/createAdvertisment', handleCreatAdvertisment);
const getCompanyMainBanner = createAsyncThunk('advertisment/getCompanyMainBanner', handlegetCompanyMainBanner);
const updateAdvertisment = createAsyncThunk('advertisment/updateAdvertisment', handleUpdateAdvertisment);
const changeAdStatus = createAsyncThunk('advertisment/changeAdStatus', handleChangeAdStatus);

export {
    getAllAdvertisments,
    createAdvertisment,
    getCompanyMainBanner,
    updateAdvertisment,
    changeAdStatus
}