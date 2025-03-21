import { createAsyncThunk } from "@reduxjs/toolkit"

const handleMainAdvertisment = async()=>{

}
const handleAdvertismentList = async()=>{

}

const mainAdvertisment = createAsyncThunk('home/mainAdvertisment', handleMainAdvertisment);
const advertismentList = createAsyncThunk('home/advertismentList', handleAdvertismentList);

export {
    mainAdvertisment,
    advertismentList
}