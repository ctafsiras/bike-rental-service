// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Bike = {
  _id: string;
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
  tagTypes: ["bikes"],
  endpoints: (builder) => ({
    getAllBikes: builder.query<Bike[], null>({
        query: () => {
            return {
              url: `/`,
              method: "GET",
            };
          },
          transformResponse: (response: { data: Bike[] }) => response.data,
    }),
    signUp: builder.mutation<Bike, Partial<Bike>>({
      query: (data) => {
        return {
          url: `/signup`,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response: { data: Bike }) => response.data,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllBikesQuery } = bikeApi;
