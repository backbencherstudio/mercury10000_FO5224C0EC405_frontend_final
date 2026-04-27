import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../lib/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

type RegisterUserPayload = {
  username: string;
  phone_number: string;
  email: string;
  password: string;
  work_at_company: string;
  city: string;
  country: string;
  type: "USER";
  trades: string[];
  qualified_leads_fee?: number;
  conversion_fee?: number;
};

export const UserService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const data = {
      email: email,
      password: password,
    };
    return await Fetch.post("/auth/login", data, config);
  },

  getTradeIdMap: async (context = null) => {
    const token =
      CookieHelper.get({ key: "accessToken", context }) ||
      CookieHelper.get({ key: "token", context });

    const response = await Fetch.get(
      "/trade",
      token
        ? {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        : undefined
    );

    const rawList = response?.data?.data ?? response?.data ?? response;
    if (!Array.isArray(rawList)) return {};

    return rawList.reduce((map: Record<string, string>, item: any) => {
      const id = String(item?.id || item?._id || "");
      const name = String(item?.name || item?.trade_name || item?.title || "")
        .trim()
        .toLowerCase();

      if (id && name) map[name] = id;
      return map;
    }, {});
  },
  
  getAllUsers: async (page = 1, limit = 10, context = null) => {
    const token =
      CookieHelper.get({ key: "accessToken", context }) ||
      CookieHelper.get({ key: "token", context });

    const response = await Fetch.get(
      `/auth/all_users?page=${page}&limit=${limit}`,
      token
        ? {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        : undefined
    );

    const payload = response?.data ?? response;
    const users = Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload)
      ? payload
      : [];

    const totalFromApi = Number(
      payload?.total ??
        payload?.totalItems ??
        payload?.meta?.total ??
        payload?.meta?.totalItems ??
        payload?.pagination?.total
    );

    const totalPagesFromApi = Number(
      payload?.totalPages ??
        payload?.meta?.totalPages ??
        payload?.pagination?.totalPages
    );

    const hasApiTotal = Number.isFinite(totalFromApi) && totalFromApi >= 0;
    const hasApiTotalPages = Number.isFinite(totalPagesFromApi) && totalPagesFromApi > 0;
    const hasMore = users.length === limit;

    const totalItems = hasApiTotal
      ? totalFromApi
      : (page - 1) * limit + users.length + (hasMore ? 1 : 0);

    const totalPages = hasApiTotalPages
      ? totalPagesFromApi
      : Math.max(1, Math.ceil(totalItems / limit));

    return {
      users,
      totalItems,
      totalPages,
    };
  },

  register: async (payload: RegisterUserPayload) => {
    return await Fetch.post("/auth/register", payload, config);
  },

  logout: (context = null) => {
    CookieHelper.destroy({ key: "token", context });
    CookieHelper.destroy({ key: "user", context });
    CookieHelper.destroy({ key: "userRole", context });
    CookieHelper.destroy({ key: "userType", context });
    CookieHelper.destroy({ key: "accessToken", context });
    CookieHelper.destroy({ key: "refreshToken", context });
  },
  // get user details
  getUserDetails: async ({ token = "", context = null }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user/me`, _config);
  },

  findAll: async (context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user`, _config);
  },

  findOne: async (id: number, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user/${id}`, _config);
  },

  findOneByUsername: async ({
    username,
    token = "",
    context = null,
  }: {
    username: string;
    token?: string;
    context?: any;
  }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token || CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user/profile/${username}`, _config);
  },

  update: async (
    {
      fname,
      lname,
      date_of_birth,
      city,
      country,
      organization,
      recipient_name,
      recipient_zip_code,
      recipient_country,
      recipient_state,
      recipient_city,
      recipient_address,
      recipient_phone_number,
    }: {
      fname: string;
      lname: string;
      date_of_birth: string;
      city: string;
      country: string;
      organization: string;
      recipient_name: string;
      recipient_zip_code: string;
      recipient_country: string;
      recipient_state: string;
      recipient_city: string;
      recipient_address: string;
      recipient_phone_number: string;
    },
    context = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      fname: fname,
      lname: lname,
      date_of_birth: date_of_birth,
      city: city,
      country: country,
      organization: organization,
      recipient_name: recipient_name,
      recipient_zip_code: recipient_zip_code,
      recipient_country: recipient_country,
      recipient_state: recipient_state,
      recipient_city: recipient_city,
      recipient_address: recipient_address,
      recipient_phone_number: recipient_phone_number,
    };

    return await Fetch.patch(`/user`, data, _config);
  },

  updateAvatar: async (data: any, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
        "content-type": "multipart/form-data",
      },
    };

    return await Fetch.patch(`/user/avatar`, data, _config);
  },

  //
  create: async (
    {
      fname,
      lname,
      username,
      email,
      role_id,
    }: {
      fname: string;
      lname: string;
      username: string;
      email: string;
      role_id: number;
    },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    const data = {
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      role_id: role_id,
    };

    return await Fetch.post(`/user`, data, _config);
  },

  // TODO
  confirm: async (
    {
      id,
      token,
      email,
      password,
    }: { id: number; token: string; email: string; password: string },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      id: id,
      token: token,
      email: email,
      password: password,
    };

    return await Fetch.patch(`/user/${id}/password`, data, _config);
  },
};
