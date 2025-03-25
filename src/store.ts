import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/auth/authSlice'
import configReducer from './features/config/configSlice'
import advertismentReducer from './features/advertisment/advertismentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
    advertisment: advertismentReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch