import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/`,
    prepareHeaders: (headers, { getState }) => {
      headers.set("tokenCybersoft", import.meta.env.VITE_TOKEN_CYBERSOFT);
      const token = getState().user.token;
      if (token) {
        headers.set("token", `${token}`);
      }
      return headers;
    },
    validateStatus: (res) => {
      if (res.status === 404)
        return { error: { status: 404, data: "Không tìm thấy" } };
      return res.ok;
    },
  }),
  tagTypes: ["Location", "Locations"],
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: () => ({
        url: `vi-tri`,
      }),
      transformResponse: (response) => ({
        locations: response.content.map((location) => ({
          ...location,
          key: location.id,
        })),
      }),
      transformErrorResponse: (response) => ({
        message:
          response.data?.content || "Đã có lỗi xảy ra khi lấy danh sách vị trí",
      }),
      providesTags: ["Locations"],
    }),
    getLocationsPhanTrang: builder.query({
      query: ({ pageIndex = 1, pageSize = 10, keyword = "" }) => ({
        url: `vi-tri/phan-trang-tim-kiem`,
        params: {
          pageIndex,
          pageSize,
          keyword: keyword.trim(),
        },
      }),
      transformResponse: (response) => {
        return {
          locations: response.content.data.map((location) => ({
            ...location,
            key: location.id,
          })),
          pagination: {
            pageIndex: response.content.pageIndex,
            pageSize: response.content.pageSize,
            totalRow: response.content.totalRow,
          },
        };
      },
      transformErrorResponse: (response) => ({
        message:
          response.data?.content || "Đã có lỗi xảy ra khi lấy danh sách vị trí",
      }),
      providesTags: ["Locations"],
    }),
    getLocationById: builder.query({
      query: (id) => `vi-tri/${id}`,
      transformResponse: (response) => {
        const location = response.content;
        return {
          id: location.id,
          tenViTri: location.tenViTri,
          tinhThanh: location.tinhThanh,
          quocGia: location.quocGia,
          hinhAnh: location.hinhAnh,
        };
      },
      transformErrorResponse: (response) => ({
        message:
          response.data?.content || "Đã có lỗi xảy ra khi lấy thông tin vị trí",
      }),
      providesTags: ["Location"],
    }),
    createLocation: builder.mutation({
      query: (location) => ({
        url: "vi-tri",
        method: "POST",
        body: location,
      }),
      transformErrorResponse: (response) => ({
        message: response.data?.content || "Đã có lỗi xảy ra khi tạo vị trí",
      }),
      invalidatesTags: ["Locations"],
    }),
    updateLocation: builder.mutation({
      query: ({ id, ...location }) => ({
        url: `vi-tri/${id}`,
        method: "PUT",
        body: location,
      }),
      transformErrorResponse: (response) => ({
        message:
          response.data?.content || "Đã có lỗi xảy ra khi cập nhật vị trí",
      }),
      invalidatesTags: ["Location", "Locations"],
    }),
    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `vi-tri/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => ({
        message: response.data?.content || "Đã có lỗi xảy ra khi xóa vị trí",
      }),
      invalidatesTags: ["Location", "Locations"],
    }),
    uploadLocationImage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `vi-tri/upload-hinh-vitri`,
        method: "POST",
        body: formData,
        params: { maViTri: id },
      }),
      transformErrorResponse: (response) => ({
        message:
          response.data?.content || "Đã có lỗi xảy ra khi upload hình vị trí",
      }),
      invalidatesTags: ["Location", "Locations"],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useGetLocationsPhanTrangQuery,
  useGetLocationByIdQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
  useUploadLocationImageMutation,
} = locationApi;
