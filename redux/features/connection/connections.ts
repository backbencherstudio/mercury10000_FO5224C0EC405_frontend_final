import { baseApi } from "../../api/baseApi";

export const Connection = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET → use query
        postConnectionRequest: builder.mutation({
            query: ({ data }) => ({
                url: "/connection-requests/admin/create",
                method: "POST",
                body: data

            }),
            invalidatesTags: ["requestconnection"],

        }),

        getRequestPool: builder.query({
            query: () => ({
                url: "/connection-requests/admin/all",
                method: "GET",

            }),
            providesTags: ["requestconnection"],

        }),

        getCunnectionStaus: builder.query({
            query: (params) => ({
                url: "/connection-requests/status-list",
                method: "GET",
                params,
            }),
            providesTags: ["requestconnection"],
        }),

        updateUserRequestSent: builder.mutation({
            query: ({ id, data }) => ({
                url: `/connection-requests/${id}/assign-users`,
                method: "PATCH",
                body: data

            }),
            invalidatesTags: ["requestconnection"],

        }),



    }),
});

// hook export (naming important)
export const { usePostConnectionRequestMutation, useGetRequestPoolQuery, useGetCunnectionStausQuery, useUpdateUserRequestSentMutation } = Connection;