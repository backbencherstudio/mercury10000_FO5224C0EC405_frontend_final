import { baseApi } from "@/redux/api/baseApi";
import { setCredentials } from "@/redux/features/auth/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          const { access_token, refresh_token } =
            result.data.authorization;

          dispatch(
            setCredentials({
              token: access_token,
              refreshToken: refresh_token,
              user: {
                id: result.data.userid,
                type: result.data.type,
              },
            })
          );

        } catch (error: any) {
          console.error("Login failed:", error?.error || error);
        }
      },
    }),

  }),

  overrideExisting: false,
});

export const { useLoginMutation } = authApi;