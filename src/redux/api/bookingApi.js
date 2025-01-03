import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/`,
    prepareHeaders: (headers, { getState }) => {
      headers.set("tokenCybersoft", import.meta.env.VITE_TOKEN_CYBERSOFT);
      const token = getState().user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Booking", "Bookings"],
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => ({
        url: `dat-phong`,
      }),
      transformResponse: (response) => {
        const bookings = response.content || [];
        return {
          bookings: bookings.map((booking) => ({
            ...booking,
            key: booking.id,
          })),
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            totalRow: bookings.length,
          },
        };
      },
      transformErrorResponse: (response) => ({
        message:
          response.data?.content ||
          "Đã có lỗi xảy ra khi lấy danh sách đặt phòng",
      }),
      providesTags: ["Bookings"],
    }),

    getBookingById: builder.query({
      query: (id) => `dat-phong/${id}`,
      transformResponse: (response) => {
        const booking = response.content;
        return {
          id: booking.id,
          maPhong: booking.maPhong,
          ngayDen: booking.ngayDen,
          ngayDi: booking.ngayDi,
          soLuongKhach: booking.soLuongKhach,
          maNguoiDung: booking.maNguoiDung,
        };
      },
      transformErrorResponse: (response) => ({
        message:
          response.data?.content ||
          "Đã có lỗi xảy ra khi lấy thông tin đặt phòng",
      }),
      providesTags: ["Booking"],
    }),

    createBooking: builder.mutation({
      query: (booking) => ({
        url: "dat-phong",
        method: "POST",
        body: booking,
      }),
      transformErrorResponse: (response) => ({
        message: response.data?.content || "Đã có lỗi xảy ra khi tạo đặt phòng",
      }),
      invalidatesTags: ["Bookings"],
    }),

    updateBooking: builder.mutation({
      query: ({ id, ...booking }) => ({
        url: `dat-phong/${id}`,
        method: "PUT",
        body: booking,
      }),
      transformErrorResponse: (response) => ({
        message:
          response.data?.content || "Đã có lỗi xảy ra khi cập nhật đặt phòng",
      }),
      invalidatesTags: ["Booking", "Bookings"],
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `dat-phong/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => ({
        message: response.data?.content || "Đã có lỗi xảy ra khi xóa đặt phòng",
      }),
      invalidatesTags: ["Booking", "Bookings"],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
