import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/auth/authSlice'
import configReducer from './features/config/configSlice'
import advertismentReducer from './features/advertisment/advertismentSlice'
import teacherreducer from './features/teacher/teacherSlice'
import coursereducer from './features/course/courseSlice'
import commonReducer from './features/comon/commonSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
    advertisment: advertismentReducer,
    teacher: teacherreducer,
    course: coursereducer,
    common: commonReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch