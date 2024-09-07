// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type User = {
  _id: string;
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
  tagTypes: ["users", "user"],
  endpoints: (builder) => ({
    getMyProfile: builder.query<User, string>({
      query: (token) => {
        return {
          url: `${USERS_SLUG}/me`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (response: { data: User }) => response.data,
    }),
    getAllUsers: builder.query<User[], string>({
      query: (token) => {
        return {
          url: `${USERS_SLUG}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (response: { data: User[] }) => response.data,
      providesTags: ["users"],
    }),
    updateMyProfile: builder.mutation<
      User,
      { user: Partial<User>; token: string }
    >({
      query: (data) => {
        return {
          url: `${USERS_SLUG}/me`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: data.user,
        };
      },
      transformResponse: (response: { data: User }) => response.data,
    }),
    deleteUser: builder.mutation<User, { token: string; userId: string }>({
      query: (data) => {
        return {
          url: `${USERS_SLUG}/`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: { userId: data.userId },
        };
      },
      transformResponse: (response: { data: User }) => response.data,
      invalidatesTags: ["users"],
    }),
    makeAdmin: builder.mutation<User, { token: string; userId: string }>({
      query: (data) => {
        return {
          url: `${USERS_SLUG}/make-admin`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: { userId: data.userId },
        };
      },
      transformResponse: (response: { data: User }) => response.data,
      invalidatesTags: ["users"],
    }),
    signUp: builder.mutation<User, Partial<User>>({
      query: (data) => {
        return {
          url: `${AUTH_SLUG}/signup`,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response: { data: User }) => response.data,
    }),
    login: builder.mutation<{ token: string }, Partial<User>>({
      query: (data) => {
        return {
          url: `${AUTH_SLUG}/login`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSignUpMutation,
  useLoginMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useMakeAdminMutation,
} = userApi;
