import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRetry } from '@/lib/api/base-query';
import type { Category, NewProduct, Product, ProductListResponse } from '@/types/product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Product', 'Products', 'Categories'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductListResponse,
      { limit?: number; skip?: number; search?: string; category?: string }
    >({
      query: ({ limit = 24, skip = 0, search, category }) =>
        category
          ? `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
          : search
            ? `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
            : `/products?limit=${limit}&skip=${skip}`,
      providesTags: ['Products'],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => '/products/categories',
      providesTags: ['Categories'],
    }),
    addProduct: builder.mutation<Product, NewProduct>({
      query: (body) => ({ url: '/products/add', method: 'POST', body }),
      invalidatesTags: ['Products'],
    }),
  }),
});
export const { useGetProductsQuery, useGetProductQuery, useGetCategoriesQuery, useAddProductMutation } = productsApi;
