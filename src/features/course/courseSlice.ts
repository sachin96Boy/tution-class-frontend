import { checkAccessedCoursebyCourseId, createCourse, createCourseData, getAllCourses, getcoursebyCourseId, getcourseDatabyCourseId, getcourseDatabyTeacherandSubject, getStudentcourseDatabyCourseId, getStudentCourses, IgetCourseDataProps, IgetCourseProps, requestCourseAccess, updateCourse, updateCourseData } from "./courseAction";
import { createSlice } from "@reduxjs/toolkit";
import { toaster } from "@/components/ui/toaster";

export type ICourseInitialState = {
    loading: boolean;
    courses: Array<IgetCourseProps>;
    studentGrantedCourses: Array<IgetCourseProps>;
    studentSearchedCourses: Array<IgetCourseProps>;
    courseData: Array<IgetCourseDataProps>
    selectedCourse: IgetCourseProps | null; //this is selected course when you go to course overview view
    selectedCourseStatus: string | null; //this is selected course when you go to course overview view
    studentCourseData: Array<any>   //this is monthly course data of selected course
    error: boolean | null;
    errorMsg: object | string;
    success: boolean;
}

const initialState: ICourseInitialState = {
    loading: false,
    courses: [],
    courseData: [],
    studentGrantedCourses: [],
    studentSearchedCourses: [],
    selectedCourse: null,
    selectedCourseStatus: null,
    studentCourseData: [],
    error: null,
    errorMsg: {},
    success: false
}

export const courseSlie = createSlice({
    name: 'course',
    initialState: initialState,
    reducers: {

        applyCoursesearch(state, action) {
            const searchPhrase = action.payload;
            if (searchPhrase.trim() != '') {
                const searchTerm = searchPhrase.toLowerCase();

                const filteredData = state.courses.filter(data => {
                    return data.title.toLowerCase().includes(searchTerm)
                })

                state.courses = filteredData;
            }
        },
        applyCourseDatasearch(state, action) {
            const searchPhrase = action.payload;
            if (searchPhrase.trim() != '') {
                const searchTerm = searchPhrase.toLowerCase();

                const filteredData = state.courseData.filter(data => {
                    return data.title.toLowerCase().includes(searchTerm)
                })

                state.courseData = filteredData;
            }
        }

    },
    extraReducers(builder) {
        builder.addCase(
            getAllCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.courses = action.payload.courses;
            }
        ).addCase(
            getAllCourses.rejected, (state, action) => {
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
            createCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            createCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const newCourse = action.payload.course;

                state.courses.push(newCourse);

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            createCourse.rejected, (state, action) => {
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
            createCourseData.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            createCourseData.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const newCourseData = action.payload.courseData;

                state.courseData.push(newCourseData);

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            createCourseData.rejected, (state, action) => {
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
            updateCourseData.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            updateCourseData.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const newCourseData = action.payload.courseData;

                let findex = state.courseData.findIndex((courseData) => courseData.id === newCourseData.id);

                if (findex !== -1) {
                    state.courseData[findex] = newCourseData;
                }

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            updateCourseData.rejected, (state, action) => {
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
            getcourseDatabyCourseId.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getcourseDatabyCourseId.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.courseData = action.payload.courseData;
            }

        ).addCase(
            getcourseDatabyCourseId.rejected, (state, action) => {
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
            getStudentCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getStudentCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.studentGrantedCourses = action.payload.accessGrantedCourses;
            }
        ).addCase(
            getStudentCourses.rejected, (state, action) => {
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
            getcourseDatabyTeacherandSubject.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getcourseDatabyTeacherandSubject.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.studentSearchedCourses = action.payload.courses;
            }
        ).addCase(
            getcourseDatabyTeacherandSubject.rejected, (state, action) => {
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
            getStudentcourseDatabyCourseId.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getStudentcourseDatabyCourseId.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.studentCourseData = action.payload.courseData;
            }
        ).addCase(
            getStudentcourseDatabyCourseId.rejected, (state, action) => {
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
            getcoursebyCourseId.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            getcoursebyCourseId.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.selectedCourse = action.payload.course;
            }
        ).addCase(
            getcoursebyCourseId.rejected, (state, action) => {
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
            updateCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            updateCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                const updatedCourse = action.payload.course;

                let findex = state.courses.findIndex((course) => course.id === updatedCourse.id);

                if (findex !== -1) {
                    state.courses[findex] = updatedCourse;
                }

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });
            }
        ).addCase(
            updateCourse.rejected, (state, action) => {
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
            checkAccessedCoursebyCourseId.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            checkAccessedCoursebyCourseId.fulfilled, (state, action) => {
                state.loading = false;

                const status = action.payload.status;

                state.selectedCourseStatus = status;


            }
        ).addCase(
            checkAccessedCoursebyCourseId.rejected, (state, action) => {
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
            requestCourseAccess.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addCase(
            requestCourseAccess.fulfilled, (state, action) => {
                state.loading = false;

                const request = action.payload.request;
                const status = request.request_status;

                state.selectedCourseStatus = status;

                toaster.create({
                    type: 'success',
                    title: action.payload.message
                });


            }
        ).addCase(
            requestCourseAccess.rejected, (state, action) => {
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

export const { applyCoursesearch, applyCourseDatasearch } = courseSlie.actions;


export default courseSlie.reducer