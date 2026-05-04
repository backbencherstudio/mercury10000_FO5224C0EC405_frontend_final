import { baseApi } from "../../api/baseApi";

export const dashboardOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // GET → use query
    getDashboardOverview: builder.query({
      query: (params) => ({
        url: "/leads/all",
        method: "GET",
        params,
      }),
    }),

    getLeadsProcess: builder.query({
      query: (params) => ({
        url: "/leads/in-process",
        method: "GET",
        params,
      }),
    }),
     updateUser: builder.mutation({
      query: ({id,body}) => ({
        url: `/auth/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    getSingleUserDetails: builder.query({
      query: (id:string) => ({
        url: `/auth/single_user/${id}`,
        method: "GET",
      }),
    }),

   getLeadsSubmition: builder.query({
  query: ({ year, month }) => ({
    url: `/leads/dashboard/submission-activity`,
    method: "GET",
    params: {
      year,
      month,
    },
  }),
}),

getLeadsHistory: builder.query({
  query: (params) => ({
    url: `/leads/all`,
    method: "GET",
    params: {
      page: params?.page,
      limit: params?.limit,
      ...(params?.search ? { search: params.search } : {}),
      ...(params?.trade_id ? { trade_id: params.trade_id } : {}),
      ...(params?.status ? { status: params.status } : {}),
    },
  }),
}),

  }),
});

// hook export (naming important)
export const { useGetDashboardOverviewQuery,useGetLeadsProcessQuery,useUpdateUserMutation,useGetSingleUserDetailsQuery, useGetLeadsSubmitionQuery,useGetLeadsHistoryQuery } = dashboardOverviewApi;