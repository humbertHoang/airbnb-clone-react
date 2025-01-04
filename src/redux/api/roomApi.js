import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
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
  }),
  tagTypes: ["Room", "Rooms"],
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: ({ pageIndex = 1, pageSize = 10, keyword = "" }) => ({
        url: `phong-thue/phan-trang-tim-kiem`,
        params: {
          pageIndex,
          pageSize,
          keyword: keyword.trim(),
        },
      }),
      transformResponse: (response) => ({
        rooms: response.content.data.map((room) => ({
          ...room,
          key: room.id,
        })),
        pagination: {
          pageIndex: response.content.pageIndex,
          pageSize: response.content.pageSize,
          totalRow: response.content.totalRow,
        },
      }),
      transformErrorResponse: (response) => ({
        message:
          response.data?.content || "Đã có lỗi xảy ra khi lấy danh sách phòng",
      }),
      providesTags: ["Rooms"],
    }),

    getRoomById: builder.query({
      query: (id) => `phong-thue/${id}`,
      transformResponse: (response) => {
        const room = response.content;
        return {
          id: room.id,
          tenPhong: room.tenPhong,
          khach: room.khach,
          phongNgu: room.phongNgu,
          giuong: room.giuong,
          phongTam: room.phongTam,
          moTa: room.moTa,
          giaTien: room.giaTien,
          mayGiat: room.mayGiat,
          banLa: room.banLa,
          tivi: room.tivi,
          dieuHoa: room.dieuHoa,
          wifi: room.wifi,
          bep: room.bep,
          doXe: room.doXe,
          hoBoi: room.hoBoi,
          banUi: room.banUi,
          maViTri: room.maViTri,
          hinhAnh: room.hinhAnh,
        };
      },
      transformErrorResponse: (response) => ({
        message:
          response.data?.content || "Đã có lỗi xảy ra khi lấy thông tin phòng",
      }),
      providesTags: ["Room"],
    }),

    createRoom: builder.mutation({
      query: (room) => ({
        url: "phong-thue",
        method: "POST",
        body: room,
      }),
      transformErrorResponse: (response) => ({
        message: response.data?.content || "Đã có lỗi xảy ra khi tạo phòng",
      }),
      invalidatesTags: ["Rooms"],
    }),

    updateRoom: builder.mutation({
      query: ({ id, ...room }) => ({
        url: `phong-thue/${id}`,
        method: "PUT",
        body: room,
      }),
      transformErrorResponse: (response) => ({
        message:
          response.data?.content || "Đã có lỗi xảy ra khi cập nhật phòng",
      }),
      invalidatesTags: ["Room", "Rooms"],
    }),

    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `phong-thue/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => ({
        message: response.data?.content || "Đã có lỗi xảy ra khi xóa phòng",
      }),
      invalidatesTags: ["Room", "Rooms"],
    }),

    uploadRoomImage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `phong-thue/upload-hinh-phong`,
        method: "POST",
        body: formData,
        params: { maPhong: id },
      }),
      transformErrorResponse: (response) => ({
        message:
          response.data?.content || "Đã có lỗi xảy ra khi upload hình phòng",
      }),
      invalidatesTags: ["Room", "Rooms"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useUploadRoomImageMutation,
} = roomApi;
