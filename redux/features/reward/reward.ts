import { baseApi } from "../../api/baseApi";

export const RewardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        //post gift card

        giftCard: builder.mutation({
            query: (body) => ({
                url: "/giftcard",
                method: "POST",
                body
            }),
            invalidatesTags: ["reward"],
        }),

        //get gift card
        getGiftCardStatus: builder.query({
            query: () => ({
                url: "/giftcard/all-gift-status",
                method: "GET",
            }),
            providesTags: ["reward"],
        }),

        // get all gift cards
        getGiftCards: builder.query({
            query: () => ({
                url: "/giftcard",
                method: "GET",
            }),
            transformResponse: (response: any) => response?.data || [],
            providesTags: ["reward"],
        }),

        //send gift card
        sendGiftCard: builder.mutation({
            query: (body) => ({
                url: "/giftcard/send-reward",
                method: "POST",
                body
            }),
            invalidatesTags: ["reward"],
        }),

        // GET → use query
        getRward: builder.query({
            query: () => ({
                url: "/support",
                method: "GET",

            }),
            providesTags: ["support"],
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
export const { useGiftCardMutation, useSendGiftCardMutation, useGetRwardQuery, useUpdataStatusMutation, useGetGiftCardStatusQuery, useGetGiftCardsQuery } = RewardApi;