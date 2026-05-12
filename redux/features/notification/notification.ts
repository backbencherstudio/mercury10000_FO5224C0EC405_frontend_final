import { baseApi } from "../../api/baseApi";

export const NotificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({



        getSocketNotification: builder.query({
            query: () => ({
                url: "/admin/notification",
                method: "GET",
            }),
            providesTags: ["Notification"],
        }),



    }),
});

// hook export (naming important)
export const { useGetSocketNotificationQuery, } = NotificationApi;