// server base url
export const URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://192.168.7.27:6003///";
// app config
export const AppConfig = () => ({
  app: {
    // server endpoint
    url: URL,
    name: "Agua Leads",
    slogan: "Agua Leads",
    meta: {
      description: "Agua Leads",
      keywords: "Agua Leads",
    },

    // api endpoint
    apiUrl: `${URL}/api`,
  },
});
