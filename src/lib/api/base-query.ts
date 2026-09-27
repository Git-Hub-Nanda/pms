import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://dummyjson.com', prepareHeaders: (headers) => { headers.set('accept', 'application/json'); return headers; } });
export const baseQueryWithRetry = retry(rawBaseQuery, { maxRetries: 2 });
