import { createSlice } from "@reduxjs/toolkit";
import { createExpence, createPayment, getAllExpences, getAllPayments, getPaymentsByStudentId, IgetExpence, IgetPayment } from "./accountingAction";
import { toaster } from "@/components/ui/toaster";

export type IaccountInitialState = {
    loading: boolean;
    payments: Array<IgetPayment>;
    studentPayments: Array<IgetPayment>;
    expences: Array<IgetExpence>
    error: boolean | null;
    errorMsg: object | string;
    success: boolean;
}

const initialState: IaccountInitialState = {
    loading: false,
    payments: [],
    studentPayments: [],
    expences: [],
    error: null,
    errorMsg: {},
    success: false
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        applyAdvsearchPayments(state, action) {
            const searchPhrase = action.payload;
            if (searchPhrase.trim() != '') {
                const searchTerm = searchPhrase.toLowerCase();

                const filteredData = state.payments.filter(data => {
                    return data.Student.full_name.toLowerCase().includes(searchTerm)
                })

                state.payments = filteredData;
            }
        },
        applyAdvsearchExpences(state, action) {
            const searchPhrase = action.payload;
            if (searchPhrase.trim() != '') {
                const searchTerm = searchPhrase.toLowerCase();

                const filteredData = state.expences.filter(data => {
                    return data.Teacher.full_name.toLowerCase().includes(searchTerm)
                })

                state.expences = filteredData;
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(
            getAllPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.payments = action.payload.payments;
            }
        ).addCase(
            getAllPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;


                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg.toString()
                });
            }
        ).addCase(
            createPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            createPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const newPayment = action.payload.payment;

                state.payments.push(newPayment);

                toaster.create({
                    type: 'success',
                    title: 'Payment created successfully'
                });
            }
        ).addCase(
            createPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg.toString()
                });
            }
        ).addCase(
            createExpence.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            createExpence.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const newExpence = action.payload.expence;

                state.expences.push(newExpence);

                toaster.create({
                    type: 'success',
                    title: 'Expence created successfully'
                });
            }
        ).addCase(
            createExpence.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;

                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg.toString()
                });
            }
        ).addCase(
            getAllExpences.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllExpences.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.expences = action.payload.expences;
            }
        ).addCase(
            getAllExpences.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;


                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg.toString()
                });
            }
        ).addCase(
            getPaymentsByStudentId.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getPaymentsByStudentId.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.studentPayments = action.payload.payments;
            }
        ).addCase(
            getPaymentsByStudentId.rejected, (state, action) => {
                state.loading = false;
                state.error = true;

                const errorData = (action.payload as any)?.error || action.error.message;


                state.errorMsg = errorData;

                toaster.create({
                    type: 'error',
                    title: state.errorMsg.toString()
                });
            }
        )
    },
});

export const { applyAdvsearchExpences, applyAdvsearchPayments } = accountSlice.actions;


export default accountSlice.reducer