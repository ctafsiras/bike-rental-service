// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
};

const AUTH_SLUG = "/api/auth";
const USERS_SLUG = "/api/users";
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bike-rental-service-backend-rho.vercel.app",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    exam: builder.query<User, string>({
      query: (name) => `${AUTH_SLUG}/${name}`,
    }),
    signUp: builder.mutation<User, Partial<User>>({
      query: (data) => {
        return {
          url: `${AUTH_SLUG}/signup`,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response: { data: User }, meta, arg) => response.data,
    }),
    login: builder.mutation<{ token: string }, Partial<User>>({
      query: (data) => {
        return {
          url: `${AUTH_SLUG}/login`,
          method: "POST",
          body: data,
        };
      },
    //   transformResponse: (response: { token: string }, meta, arg) => {
    //     token: response.token;
    //   },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignUpMutation, useLoginMutation } = userApi;
