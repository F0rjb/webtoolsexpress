import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Product {
  name: string
  description: string
  price: number
}

interface ProductState {
  loading: boolean
  error: string | null
  products: Product[]
}

const initialState: ProductState = {
  loading: false,
  error: null,
  products: [],
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setProductsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
  },
})

export const { setProducts, setProductsError, setProductsLoading } =
  productSlice.actions

export const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/product" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "",
    }),
  }),
})

export const { useGetProductsQuery } = productApi
