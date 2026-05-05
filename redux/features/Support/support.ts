import { baseApi } from "../../api/baseApi";

export const SupportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // GET → use query
    getSupport: builder.query({
      query: () => ({
        url: "/support",
        method: "GET",
    
      }),
      providesTags:["support"],
    }),

 updataStatus: builder.mutation({
  query: ({ id, status }) => ({
    url: `/support/${id}/resolve`,
    method: "PATCH",
    body: { status },
  }),
  invalidatesTags: ["support"],
}),

  }),
});

// hook export (naming important)
export const { useGetSupportQuery, useUpdataStatusMutation } = SupportApi;