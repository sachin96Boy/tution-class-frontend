
import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IregisterProps = {
    fullName: string;
    email: string,
    phone: string,
    password: string
}
export type ICoporateregisterProps = {
    userName: string;
    email: string,
    userType: Array<string>,
    password: string
}


export type IloginProps = {
    emailOrMobile: string,
    password: string
}
export type IloginPropsAdmin = {
    email: string,
    password: string
}



const handleRegisterCoporateUser = async (value: ICoporateregisterProps, { rejectWithValue }: any) => {
    try {

        const { userName, email, userType, password } = value;

        const response = await axiosInstance.post(
            '/auth/register',
            { userName, email, userType, password }
        );

        return response.data;

    } catch (err: any) {

        return rejectWithValue(err.response.data);

    }
}
const handleLoginCoporateUser = async (value: IloginPropsAdmin, { rejectWithValue }: any) => {

    try {

        const { email, password } = value;

        const response = await axiosInstance.post(
            'auth/login',
            { email, password }
        );
        return response.data

    } catch (err: any) {

        return rejectWithValue(err.response.data);

    }

}
const handleRegisterUser = async (value: IregisterProps, { rejectWithValue }: any) => {
    try {

        const { fullName, email, phone, password } = value;

        const response = await axiosInstance.post(
            '/auth/register-student',
            { fullName, email, phone, password }
        );

        return response.data;

    } catch (err: any) {

        return rejectWithValue(err.response.data)

    }
}
const handleLoginUser = async (value: IloginProps, { rejectWithValue }: any) => {

    try {

        const { emailOrMobile, password } = value;

        const response = await axiosInstance.post(
            'auth/login-student',
            { emailOrMobile, password }
        );

        console.log(response.data);
        return response.data


    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response.data);

    }

}

const registerUser = createAsyncThunk('auth/register', handleRegisterUser);
const loginUser = createAsyncThunk('auth/login', handleLoginUser);

const registerCoporateUser = createAsyncThunk('auth/coporateregister', handleRegisterCoporateUser);
const loginCoporateUser = createAsyncThunk('auth/coporatelogin', handleLoginCoporateUser);

export {
    registerUser,
    loginUser,
    registerCoporateUser,
    loginCoporateUser
}