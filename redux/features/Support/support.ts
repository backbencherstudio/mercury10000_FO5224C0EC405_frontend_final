import { baseApi } from "../../api/baseApi";

export const SupportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET → use query
    getSupport: builder.query({
      query: () => ({
        url: "/support",
        method: "GET",

      }),
      providesTags: ["support"],
    }),



    singleSupport: builder.query({
      query: (id) => ({
        url: `/support/${id}`,
        method: "GET",

      }),
      providesTags: ["support"],
    }),


    updataStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/support/${id}/resolve`,
        method: "PATCH",
        body: { status: String(status) },
      }),
      invalidatesTags: ["support"],
    }),


    updataNote: builder.mutation({
      query: ({ id, secretaryNote }) => ({
        url: `/support/${id}/secretary-note`,
        method: "PATCH",
        body: { secretaryNote },
      }),
      invalidatesTags: ["support"],
    }),

  }),
});

// hook export (naming important)
export const { useGetSupportQuery, useUpdataStatusMutation, useUpdataNoteMutation, useSingleSupportQuery } = SupportApi;