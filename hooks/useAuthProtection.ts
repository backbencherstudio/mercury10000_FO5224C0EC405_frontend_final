import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { StorageHelper } from "@/helper/storage.helper";
import { normalizeAppRole, getDashboardPathByRole } from "@/helper/auth.helper";

const AUTH_ROUTES = ["/log-in", "/login", "/sign-up", "/verify-email", "/verify-success", "/region"];
const ADMIN_PREFIX = "/dashboard";
const SECRETARY_PREFIX = "/secretary-dashboard";

export const useAuthProtection = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userRole = StorageHelper.getUserRole();
    const user = StorageHelper.getUser();
    const resolvedRole = normalizeAppRole(userRole);
    const isAuthenticated = Boolean(user && resolvedRole);

    const isAuthRoute = AUTH_ROUTES.some((route) =>
      pathname === route || pathname.startsWith(`${route}/`)
    );
    const isAdminRoute =
      pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`);
    const isSecretaryRoute =
      pathname === SECRETARY_PREFIX ||
      pathname.startsWith(`${SECRETARY_PREFIX}/`);
    const isProtectedRoute = isAdminRoute || isSecretaryRoute;

    // Redirect to login if accessing protected route without auth
    if (isProtectedRoute && !isAuthenticated) {
      router.replace(`/log-in?redirect=${pathname}`);
      return;
    }

    // Redirect to dashboard if authenticated and on auth route
    if (isAuthenticated && isAuthRoute) {
      const destination = getDashboardPathByRole(resolvedRole);
      router.replace(destination);
      return;
    }

    // Redirect admin users trying to access secretary routes
    if (isAuthenticated && isAdminRoute && resolvedRole !== "admin") {
      router.replace(SECRETARY_PREFIX);
      return;
    }

    // Redirect secretary users trying to access admin routes
    if (
      isAuthenticated &&
      isSecretaryRoute &&
      resolvedRole !== "secretary"
    ) {
      router.replace(ADMIN_PREFIX);
      return;
    }
  }, [pathname, router]);
};
