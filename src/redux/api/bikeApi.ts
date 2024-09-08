// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Bike = {
  _id?: string;
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
};

// Define a service using a base URL and expected endpoints
export const bikeApi = createApi({
  reducerPath: "bikeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bike-rental-service-backend-rho.vercel.app/api/bikes",
  }),
  tagTypes: ["bikes", "bike"],
  endpoints: (builder) => ({
    getAllBikes: builder.query<Bike[], null>({
      query: () => {
        return {
          url: `/`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: Bike[] }) => response.data,
      providesTags: ["bikes"],
    }),
    getSingleBike: builder.query<Bike, string>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: Bike }) => response.data,
    }),
    createNewBike: builder.mutation<Bike, { bike: Bike; token: string }>({
      query: (data) => {
        return {
          url: `/`,
          method: "POST",
          body: data.bike,
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      transformResponse: (response: { data: Bike }) => response.data,
      invalidatesTags: ["bikes"],
    }),

    updateBike: builder.mutation<Bike, { bike: Partial<Bike>; token: string }>({
      query: (data) => {
        return {
          url: `/${data.bike._id}`,
          method: "PUT",
          body: data.bike,
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      transformResponse: (response: { data: Bike }) => response.data,
      invalidatesTags: ["bikes"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllBikesQuery,
  useGetSingleBikeQuery,
  useCreateNewBikeMutation,
  useUpdateBikeMutation,
} = bikeApi;
