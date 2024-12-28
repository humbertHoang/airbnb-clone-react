import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User", "Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ pageIndex = 1, pageSize = 10, keywords = "" }) => ({
        url: `users/phan-trang-tim-kiem`,
        params: { pageIndex, pageSize, keywords },
      }),
      transformResponse: (response) => ({
        users: response.content.data,
        pagination: {
          pageIndex: response.content.pageIndex,
          pageSize: response.content.pageSize,
          totalRow: response.content.totalRow,
        },
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
    addUser: builder.mutation({
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
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
