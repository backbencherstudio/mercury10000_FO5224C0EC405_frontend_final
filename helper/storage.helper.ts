/**
 * LocalStorage helper for client-side auth storage
 */
export class StorageHelper {
  private static PREFIX = "auth_";

  /**
   * Set item in localStorage
   */
  static setItem(key: string, value: any) {
    if (typeof window !== "undefined") {
      const prefixedKey = `${this.PREFIX}${key}`;
      const serialized = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(prefixedKey, serialized);
    }
  }

  /**
   * Get item from localStorage
   */
  static getItem(key: string) {
    if (typeof window !== "undefined") {
      const prefixedKey = `${this.PREFIX}${key}`;
      return localStorage.getItem(prefixedKey);
    }
    return null;
  }

  /**
   * Get parsed item from localStorage
   */
  static getParsedItem<T>(key: string): T | null {
    const item = this.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  /**
   * Remove item from localStorage
   */
  static removeItem(key: string) {
    if (typeof window !== "undefined") {
      const prefixedKey = `${this.PREFIX}${key}`;
      localStorage.removeItem(prefixedKey);
    }
  }

  /**
   * Clear all auth items from localStorage
   */
  static clear() {
    if (typeof window !== "undefined") {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    }
  }

  /**
   * Get access token
   */
  static getAccessToken() {
    return this.getItem("accessToken");
  }

  /**
   * Get refresh token
   */
  static getRefreshToken() {
    return this.getItem("refreshToken");
  }

  /**
   * Get user role
   */
  static getUserRole() {
    return this.getItem("userRole");
  }

  /**
   * Get user info
   */
  static getUser() {
    return this.getParsedItem("user");
  }
}
