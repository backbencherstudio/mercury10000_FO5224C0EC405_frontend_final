// server base url
export const URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://192.168.7.27:6003";
// app config
export const AppConfig = () => ({
  app: {
    // server endpoint
    url: URL,
    name: "app",
    slogan: "app",
    meta: {
      description: "app",
      keywords: "app",
    },

    // api endpoint
    apiUrl: `${URL}/api`,
  },
});
