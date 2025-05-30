import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/auth/authSlice'
import configReducer from './features/config/configSlice'
import advertismentReducer from './features/advertisment/advertismentSlice'
import teacherreducer from './features/teacher/teacherSlice'
import userReducer from './features/users/userSlice'
import coursereducer from './features/course/courseSlice'
import commonReducer from './features/comon/commonSlice'
import studentReducer from './features/student/studentSlice'
import timeTableReducer from './features/timetable/timeTableSlice'
import accountReducer from './features/accounting/accountingSlice'
import assignmentReducer from './features/assignment/assignmentSlice'
import statReducer from './features/statistics/statisticsSlice'
import reportReducer from './features/reports/reportSlice'
import attandanceReducer from './features/attandance/attandanceSlice'
import requestReducer from './features/requests/requestSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
    advertisment: advertismentReducer,
    teacher: teacherreducer,
    user: userReducer,
    student: studentReducer,
    course: coursereducer,
    common: commonReducer,
    timetable: timeTableReducer,
    account: accountReducer,
    assignment: assignmentReducer,
    stat: statReducer,
    report: reportReducer,
    attandance: attandanceReducer,
    request: requestReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch