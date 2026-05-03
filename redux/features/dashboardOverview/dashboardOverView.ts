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

  }),
});

// hook export (naming important)
export const { useGetDashboardOverviewQuery,useGetLeadsProcessQuery } = dashboardOverviewApi;