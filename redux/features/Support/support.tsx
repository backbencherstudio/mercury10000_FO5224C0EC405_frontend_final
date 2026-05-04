import { baseApi } from "../../api/baseApi";

export const SupportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // GET → use query
    getSupport: builder.query({
      query: () => ({
        url: "/support",
        method: "GET",
    
      }),
    }),

 updataStatus: builder.mutation({
  query: ({ id, status }) => ({
    url: `/support/${id}/resolve`,
    method: "PATCH",
    body: { status },
  }),
}),

  }),
});

// hook export (naming important)
export const { useGetSupportQuery, useUpdataStatusMutation } = SupportApi;