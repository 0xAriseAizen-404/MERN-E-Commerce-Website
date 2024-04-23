import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        providesTags: (res, err, productId) => [
          { type: "Product", id: productId },
        ],
      }),
    }),
    allProducts: builder.query({
      query: () => `${PRODUCT_URL}/allproducts`,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
    }),
    getTopProducts: builder.query({
      query: () => `${PRODUCT_URL}/top`,
      keepUnusedDataFor: 5,
    }),
    getNewProducts: builder.query({
      query: () => `${PRODUCT_URL}/new`,
      keepUnusedDataFor: 5,
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUploadProductImageMutation,
  useGetNewProductsQuery,
  useGetTopProductsQuery,
  useCreateReviewMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsQuery,
} = productApiSlice;
