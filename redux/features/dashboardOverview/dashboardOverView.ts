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

    //lead process
    getLeadsProcess: builder.query({
      query: (params) => ({
        url: "/leads/in-process",
        method: "GET",
        params,
      }),
      providesTags: ["LeadsStatus"],
    }),

    updateStausLeadsProcess: builder.mutation({
      query: ({ id, status }) => ({
        url: `/leads/${id}/status`,
        method: "PATCH",
        body: { status }
      }),
      invalidatesTags: ["LeadsStatus"],
    }),

    //update user
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/auth/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    //get single user details
    getSingleUserDetails: builder.query({
      query: (id: string) => ({
        url: `/auth/single_user/${id}`,
        method: "GET",
      }),
    }),

    //leads submition
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

    // leads history
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

    //lead in process time
    updateScheduleTime: builder.mutation({
      query: ({ id, scheduled_time }) => ({
        url: `/leads/${id}/schedule`,
        method: "PATCH",
        body: { scheduled_time },
      }),
      invalidatesTags: ["Leads"],
    }),


  }),
});

// hook export (naming important)
export const { useGetDashboardOverviewQuery, useGetLeadsProcessQuery, useUpdateUserMutation, useGetSingleUserDetailsQuery, useGetLeadsSubmitionQuery, useGetLeadsHistoryQuery, useUpdateScheduleTimeMutation, useUpdateStausLeadsProcessMutation } = dashboardOverviewApi;