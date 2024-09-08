// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Booking {
  _id?: string;
  userId?: {
    _id: string;
    name: string;
  };
  bikeId?: {
    _id: string;
    name: string;
  };
  startTime: Date;
  returnTime?: Date | null; // Optional and can be null
  totalCost?: number; // Optional with a default value
  isReturned?: boolean; // Optional with a default value
}

// Define a service using a base URL and expected endpoints
export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bike-rental-service-backend-rho.vercel.app/api/rentals",
  }),
  tagTypes: ["bookings", "booking"],
  endpoints: (builder) => ({
    createNewBooking: builder.mutation<
      Booking,
      { booking: Booking; token: string }
    >({
      query: (data) => {
        return {
          url: `/`,
          method: "POST",
          body: data.booking,
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      transformResponse: (response: { data: Booking }) => response.data,
      invalidatesTags: ["bookings"],
    }),
    getUserBookings: builder.query<Booking[], string>({
      query: (token) => {
        return {
          url: `/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (response: { data: Booking[] }) => response.data,
      providesTags: ["bookings"],
    }),
    getAllUserBookings: builder.query<Booking[], string>({
      query: (token) => {
        return {
          url: `/all`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (response: { data: Booking[] }) => response.data,
      providesTags: ["bookings"],
    }),
    returnBike: builder.mutation<Booking, { id: string; token: string }>({
      query: (data) => {
        return {
          url: `/${data.id}/return`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      transformResponse: (response: { data: Booking }) => response.data,
      invalidatesTags: ["bookings"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateNewBookingMutation,
  useGetUserBookingsQuery,
  useGetAllUserBookingsQuery,
  useReturnBikeMutation,
} = bookingApi;
