import { createSlice } from "@reduxjs/toolkit";

export type IhomeInitialState = {
    loading: boolean;
    mainAd: string | null;
    advertismentList: Array<string> | null;
    error: string | null;
    success: boolean; 
}

const initialState : IhomeInitialState = {
    loading: false,
    mainAd: null,
    advertismentList: [],
    error: null,
    success: false
}

export const homeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        
    },
});