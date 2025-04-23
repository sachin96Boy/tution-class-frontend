import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICoporateEditProps, ICoporateResetPasswordProps } from "../auth/authAction";

const handleGetAllUsers = async ({ rejectWithValue }: any) => {
    try {

        const response = await axiosInstance.get(
            'user/getAllUsers'
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handleupdateUser = async (values: ICoporateEditProps, { rejectWithValue }: any) => {
    try {

        const dataObj = {
            "enc_user_id": values.user_id,
            "email": values.email,
            'username': values.userName
        }

        const response = await axiosInstance.post(
            'user/updateUser',
            dataObj
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}
const handlepassword_reset = async (values: ICoporateResetPasswordProps, { rejectWithValue }: any) => {
    try {

        const dataObj = {
            "enc_user_id": values.user_id,
            "password": values.password
        }

        const response = await axiosInstance.post(
            'user/reset-password',
            dataObj
        );

        return response.data;

    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
}

const getAllUsers = createAsyncThunk('user/getAllUsers', handleGetAllUsers);
const updateUser = createAsyncThunk('user/updateuser', handleupdateUser);
const reset_password = createAsyncThunk('user/passwordReset', handlepassword_reset);

export {
    getAllUsers,
    updateUser,
    reset_password
}