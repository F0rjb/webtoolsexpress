import React, { useEffect } from "react"
import ProductCard from "./ProductCard"
import { useGetProductsQuery } from "../services/productsApi"

const Products = () => {
  const {
    data: allProductsData,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetProductsQuery()

  useEffect(() => {
    // You can perform additional actions here if needed
  }, [])

  if (isLoading) return <h1>Loading</h1>

  return (
    <div>
      {isSuccess
        ? allProductsData.map((product) => (
            <div className="" key={product._id}>
              {/* // <h1>{product.name}</h1>
              // <p>{product.description}</p>
              // <p>{product.price}</p> */}
              {/* Render other properties as needed */}
              <ProductCard key={product._id} el={product} />
            </div>
          ))
        : "Loading products..."}
    </div>
  )
}

export default Products
