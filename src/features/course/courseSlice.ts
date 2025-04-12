import { createCourse, createCourseData, getAllCourses, getcourseDatabyCourseId, getcourseDatabyTeacherandSubject, getStudentCourses, IgetCourseDataProps, IgetCourseProps } from "./courseAction";
import { createSlice } from "@reduxjs/toolkit";
import { toaster } from "@/components/ui/toaster";

export type ICourseInitialState = {
    loading: boolean;
    courses: Array<IgetCourseProps>;
    studentGrantedCourses: Array<IgetCourseProps>;
    studentSearchedCourses: Array<IgetCourseProps>;
    courseData: Array<IgetCourseDataProps>
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
    error: null,
    errorMsg: {},
    success: false
}

export const courseSlie = createSlice({
    name: 'course',
    initialState: initialState,
    reducers: {},
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
                    title: 'Course created successfully'
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
                    title: 'CourseData created successfully'
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
        )
    },
});

export default courseSlie.reducer