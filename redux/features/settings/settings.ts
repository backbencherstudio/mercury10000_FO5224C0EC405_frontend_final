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

          getOnboarding: builder.query({
            query: () => ({
                url: "/onboarding",
                method: "GET",
                

            }),
            providesTags: ["onboarding"],

        }),

        getSettingNotification: builder.query({
            query: () => ({
                url: "/admin/notification/notification-settings",
                method: "GET",

            }),
            providesTags: ["settingNote"],

        }),

        updateSettingNotification: builder.mutation({
            query: (data) => ({
                url: "/admin/notification/update-settings",
                method: "PATCH",
                body: data,
            }),
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
export const { usePostOnboardingMutation, useGetOnboardingQuery, useGetSettingNotificationQuery, useUpdateSettingNotificationMutation, useUpdataStatusMutation } = SettingsApi;