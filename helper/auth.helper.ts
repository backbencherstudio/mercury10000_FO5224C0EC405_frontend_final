export type AppUserRole = "admin" | "secretary";

export type ApiUserType = "SUP_ADMIN" | "SECRETARY";

export const normalizeAppRole = (
  value?: string | null
): AppUserRole | null => {
  if (!value) return null;

  const normalized = value.trim().toUpperCase();

  if (normalized === "SUP_ADMIN" || normalized === "ADMIN") {
    return "admin";
  }

  if (normalized === "SECRETARY") {
    return "secretary";
  }

  return null;
};

export const getDashboardPathByRole = (role?: AppUserRole | null) => {
  return role === "secretary" ? "/secretary-dashboard" : "/dashboard";
};
