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
      query: ({ id }) => ({
        url: `/trades/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trades"],
    }),


    updateTrade: builder.mutation({
      query: ({ id, body }) => ({
        url: `/trades/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Trades"],
    }),

    getFinancilaActivity: builder.query({
      query: ({ id, year }) => ({
        url: `/leads/${id}/user-statistics?year=2026`,
        method: "GET",

      }),
    }),

    getAllscratery: builder.query({
      query: (params) => ({
        url: "/auth/all_secretary",
        method: "GET",
        params,
      }),
    }),

    getSpecificActivity: builder.query({
      query: ({
        page,
        limit,
        search,
        startDate,
        endDate
      }) => ({
        url:
          `/leads/all-see-user-leads?page=${page}&limit=${limit}` +
          `${search ? `&search=${search}` : ""}` +
          `${startDate ? `&startDate=${startDate}` : ""}` +
          `${endDate ? `&endDate=${endDate}` : ""}`,

        method: "GET",
      }),
      providesTags: ["SpecificActivity"],
    }),

    updateLeadStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/leads/${id}/collected-status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["SpecificActivity"],
    }),

  }),
});

// hook export (naming important)
export const { useGetTradesQuery, useCreateTradeMutation, useDeleteTradeMutation, useUpdateTradeMutation, useGetFinancilaActivityQuery, useGetAllscrateryQuery, useGetSpecificActivityQuery, useUpdateLeadStatusMutation } = UserApi;