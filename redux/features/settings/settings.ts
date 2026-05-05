import { baseApi } from "../../api/baseApi";

export const SettingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET → use query
        postOnboarding: builder.mutation({
            query: ({ data }) => ({
                url: "/onboarding/upload",
                method: "POST",
                body: data

            }),
            invalidatesTags: ["onboarding"],

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
export const { usePostOnboardingMutation, useUpdataStatusMutation } = SettingsApi;