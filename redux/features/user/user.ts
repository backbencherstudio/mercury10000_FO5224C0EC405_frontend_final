import { baseApi } from "../../api/baseApi";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET → use query
   getTrades: builder.query({
  query: () => "/trades",
  transformResponse: (response: any) => response?.data ?? [],
  providesTags: ["Trades"],
}),

    createTrade: builder.mutation({
      query: (body) => ({
        url: "/trades",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Trades"],
    }),


    deleteTrade: builder.mutation({
      query: ({id}) => ({
        url: `/trades/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trades"],
    }),


     updateTrade: builder.mutation({
      query: ({id,body}) => ({
        url: `/trades/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Trades"],
    }),

      getAllscratery: builder.query({
      query: (params) => ({
        url: "/auth/all_secretary",
        method: "GET",
        params,
      }),
    }),

  }),
});

// hook export (naming important)
export const { useGetTradesQuery, useCreateTradeMutation,useDeleteTradeMutation,useUpdateTradeMutation,useGetAllscrateryQuery } = UserApi;