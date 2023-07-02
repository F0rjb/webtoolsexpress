import { createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Product {
  name: string
  description: string
  price: number
}
interface Products {}
// const productSlice = createSlice({})

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: String; password: String }) => {
        return { url: "/login", method: "post", body }
      },
    }),
    registerUser: builder.mutation({
      query: (body: { name: String; email: String; password: String }) => {
        return { url: "/register", method: "post", body }
      },
    }),
  }),
})
export const { useLoginUserMutation, useRegisterUserMutation } = authApi
