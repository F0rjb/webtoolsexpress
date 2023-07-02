import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { authApi } from "../components/services/authApi"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import authReducer from "../features/authSlice"
import { productApi } from "../components/services/productsApi"

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer, // Add the product slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productApi.middleware), // Add the product slice middleware
})

// Setup listeners for RTK-Query to enable automatic cache invalidation and refetching
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
