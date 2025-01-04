import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
        return { error: { status: 404, data: "Not Found" } };
      return res.ok;
    },
  }),
  tagTypes: ["User", "Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ pageIndex = 1, pageSize = 10, keyword = "" }) => ({
        url: `users/phan-trang-tim-kiem`,
        params: {
          pageIndex,
          pageSize,
          keyword: keyword.trim(),
        },
      }),
      transformResponse: (response) => {
        return {
          users: response.content.data.map((user) => ({
            ...user,
            key: user.id,
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
          response.data?.content ||
          "Đã có lỗi xảy ra khi lấy danh sách người dùng",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: "User", id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      transformResponse: (response) => {
        const userData = response.content;
        return {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          birthday: userData.birthday,
          role: userData.role,
        };
      },
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "Users", id: "LIST" },
      ],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users`,
        params: { id },
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    uploadAvatar: builder.mutation({
      query: ({ formData }) => ({
        url: `users/upload-avatar`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ({ id }) => [
        { type: "User", id },
        { type: "Users", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadAvatarMutation,
} = userApi;
