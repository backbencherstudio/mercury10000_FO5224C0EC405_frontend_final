/**
 * API Error Handler - Centralized error handling for API calls
 */

export interface ApiErrorResponse {
  success: false;
  message: {
    message: string;
    statusCode: number;
  };
}

export const handleApiError = (error: any) => {
  console.error("❌ API Error:", error);

  // Handle different error types
  if (error?.status === 401) {
    console.error("🔐 Unauthorized - Token might be invalid or expired");
    // Clear auth and redirect to login
    localStorage.removeItem("auth_accessToken");
    localStorage.removeItem("auth_userRole");
    localStorage.removeItem("auth_user");
    window.location.href = "/log-in";
    return "Session expired. Please log in again.";
  }

  if (error?.status === 403) {
    console.error("🚫 Forbidden - Access denied");
    return "You don't have permission to access this resource.";
  }

  if (error?.status === 404) {
    console.error("🔍 Not Found");
    return "Resource not found.";
  }

  if (error?.status === 500) {
    console.error("💥 Server Error");
    return "Server error. Please try again later.";
  }

  if (error?.data?.message) {
    return error.data.message;
  }

  if (typeof error?.data === "string") {
    return error.data;
  }

  return "An error occurred. Please try again.";
};

/**
 * Log API request details for debugging
 */
export const logApiRequest = (
  method: string,
  url: string,
  params?: any,
  headers?: any
) => {
  console.group(`📤 API Request: ${method} ${url}`);
  if (params) console.log("Params:", params);
  if (headers) console.log("Headers:", headers);
  console.groupEnd();
};

/**
 * Log API response details for debugging
 */
export const logApiResponse = (url: string, status: number, data: any) => {
  console.group(`📥 API Response: ${url} [${status}]`);
  console.log("Data:", data);
  console.groupEnd();
};

/**
 * Check if token is valid (basic check)
 */
export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    // Basic JWT validation
    if (!token.startsWith("eyJ")) {
      console.warn("⚠️  Token doesn't look like a JWT");
      return false;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      console.warn("⚠️  Invalid JWT format");
      return false;
    }

    // Decode payload
    const payload = JSON.parse(atob(parts[1]));

    // Check expiration
    if (payload.exp) {
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) {
        console.warn("⏰ Token is expired");
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

/**
 * Get token info for debugging
 */
export const getTokenInfo = (token: string | null) => {
  if (!token) {
    console.log("❌ No token found");
    return null;
  }

  try {
    const parts = token.split(".");
    const payload = JSON.parse(atob(parts[1]));

    const expiresIn = payload.exp ? payload.exp * 1000 - Date.now() : null;
    const expiresAt = new Date(expiresIn ? Date.now() + expiresIn : 0);

    return {
      payload,
      expiresAt,
      expiresInMinutes: expiresIn ? Math.floor(expiresIn / 60000) : null,
      isValid: isTokenValid(token),
    };
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
};

/**
 * Debug helper to check auth status
 */
export const debugAuthStatus = () => {
  console.group("🔍 Auth Status Debug");

  const token = localStorage.getItem("auth_accessToken");
  const role = localStorage.getItem("auth_userRole");
  const user = localStorage.getItem("auth_user");

  console.log("Token exists:", !!token);
  console.log("Role:", role);
  console.log("User:", user ? JSON.parse(user) : null);

  if (token) {
    const tokenInfo = getTokenInfo(token);
    console.log("Token Info:", tokenInfo);
  }

  console.groupEnd();
};

// Auto-run on page load (optional, for development)
if (process.env.NODE_ENV === "development") {
  if (typeof window !== "undefined") {
    (window as any).debugAuthStatus = debugAuthStatus;
    (window as any).getTokenInfo = getTokenInfo;
    console.log("💡 Use debugAuthStatus() or getTokenInfo(token) in console");
  }
}
