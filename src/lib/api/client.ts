import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

export const apiClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://dummyjson.com', timeout: 10_000, headers: { Accept: 'application/json' } });
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => { config.headers.set('X-Requested-With', 'PMS-Web'); return config; });
apiClient.interceptors.response.use((response) => response, async (error: AxiosError<{ message?: string }>) => Promise.reject(new Error(error.response?.data?.message ?? 'A network error occurred. Please try again.')));
