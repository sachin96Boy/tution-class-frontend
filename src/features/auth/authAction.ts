import { toaster } from "@/components/ui/toaster";
import axiosInstance from "@/utils/AxiosInstans";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type IregisterProps = {
    fullName: string;
    email: string,
    phone: string,
    password: string
}

export type IloginProps = {
    email: string,
    password: string
}


const handleRegisterUser = async ({ fullName, email, phone, password }: IregisterProps,) => {
    try {

        const response = await axiosInstance.post(
            '/auth/register',
            { fullName, email, phone, password }
        );

        return response.data;

    } catch (err: any) {

        console.log(err)

        // success toast
        toaster.create({
            title: err.error,
            type: 'error'
        });

    }
}
const handleLoginUser = async ({ email, password }: IloginProps) => {

    try {

        const response = await axiosInstance.post(
            'auth/login',
            { email, password }
        );

        return response.data

    } catch (err: any) {

        console.log(err)

        // success toast
        toaster.create({
            title: err.error,
            type: 'error'
        });

    }

}

const registerUser = createAsyncThunk('auth/register', handleRegisterUser);
const loginUser = createAsyncThunk('auth/login', handleLoginUser);

export {
    registerUser,
    loginUser
}