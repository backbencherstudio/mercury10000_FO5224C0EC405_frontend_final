# LocalStorage Authentication Migration Guide

## Overview
This project has been migrated from **cookie-based authentication** to **localStorage-based authentication**.

## Key Changes

### 1. New Files Created

#### `helper/storage.helper.ts`
- Centralized helper class for managing localStorage
- Handles prefixed key management (`auth_` prefix)
- Methods:
  - `setItem(key, value)` - Store data
  - `getItem(key)` - Retrieve data
  - `getParsedItem<T>(key)` - Retrieve parsed JSON data
  - `removeItem(key)` - Remove specific item
  - `clear()` - Clear all auth items
  - `getAccessToken()` - Get access token
  - `getRefreshToken()` - Get refresh token
  - `getUserRole()` - Get user role
  - `getUser()` - Get user object

#### `hooks/useAuthProtection.ts`
- Client-side authentication protection hook
- Handles route protection and redirects
- Protects both admin and secretary routes
- Automatically redirects unauthenticated users to login

#### `components/providers/AuthProtectionWrapper.tsx`
- Wraps the entire app to enable auth protection
- Uses `useAuthProtection` hook

### 2. Modified Files

#### `components/auth/Login.tsx`
**Changes:**
- Removed `setCookie` from nookies
- Replaced with `StorageHelper` for localStorage
- Uses `StorageHelper.setItem()` to store:
  - `accessToken` (from API response)
  - `refreshToken` (from API response)
  - `user` (user object with email, userid, role, type)
  - `userRole` (normalized role)
  - `userType` (API user type)
- Removed cookie maxAge logic (localStorage persists until manually cleared)

#### `redux/api/baseApi.ts`
**Changes:**
- Removed cookie-based token retrieval
- Now uses `StorageHelper.getAccessToken()` in `prepareHeaders`
- Retrieves token from localStorage on every API request
- Sets `Authorization` header with token value

#### `middleware.ts`
**Changes:**
- Simplified to pass through all requests
- Auth protection moved to client-side via `useAuthProtection` hook
- Middleware now just allows requests to proceed

#### `app/layout.tsx`
**Changes:**
- Added `AuthProtectionWrapper` component
- Wraps children to enable auth protection globally

## Usage Examples

### Storing Data After Login
```typescript
import { StorageHelper } from '@/helper/storage.helper';

StorageHelper.setItem('accessToken', token);
StorageHelper.setItem('userRole', role);
StorageHelper.setItem('user', userObject);
```

### Retrieving Data
```typescript
const token = StorageHelper.getAccessToken();
const role = StorageHelper.getUserRole();
const user = StorageHelper.getUser();
```

### Logging Out
```typescript
StorageHelper.clear(); // Clears all auth data
router.push('/login');
```

## Authentication Flow

1. **User Login**
   - User submits email/password
   - Server returns access_token, refresh_token, and user data
   - Login component stores everything in localStorage

2. **API Requests**
   - `baseApi` intercepts all requests via `prepareHeaders`
   - Retrieves token from localStorage
   - Adds `Authorization` header with token
   - Sends request to API

3. **Route Protection**
   - `AuthProtectionWrapper` component uses `useAuthProtection` hook
   - Hook runs on every route change (via `pathname` dependency)
   - Checks localStorage for auth data
   - Redirects unauthenticated users to login
   - Redirects users to correct dashboard based on role

## Browser DevTools Check

To verify localStorage is working:
1. Open DevTools (F12)
2. Go to "Application" tab
3. Click "Local Storage"
4. Click your domain
5. Look for items with `auth_` prefix:
   - `auth_accessToken`
   - `auth_refreshToken`
   - `auth_userRole`
   - `auth_user`
   - `auth_userType`

## Important Notes

- **No Server-Side Auth**: Since localStorage is client-side only, the server cannot protect routes. Use API-level authentication for sensitive operations.
- **Token Refresh**: Implement token refresh logic in the API error handling
- **Logout**: Always call `StorageHelper.clear()` on logout
- **SSR Compatibility**: All auth checks are client-side only (components marked with "use client")
- **Remember Me**: localStorage persists until manually cleared - no need for time-based expiry on client

## Security Considerations

1. **HTTPS Only**: Always use HTTPS in production
2. **XSS Prevention**: localStorage is vulnerable to XSS attacks - ensure no untrusted code is executed
3. **Token Storage**: Consider using httpOnly cookies for tokens if possible (requires backend support)
4. **Logout**: Always clear localStorage on logout/token expiration

## Migration Checklist

- [x] Created StorageHelper for centralized storage management
- [x] Updated Login component to use localStorage
- [x] Updated baseApi to read token from localStorage
- [x] Created useAuthProtection hook for client-side route protection
- [x] Created AuthProtectionWrapper to enable protection globally
- [x] Updated middleware to allow all requests (auth on client)
- [x] Updated root layout to include AuthProtectionWrapper

## Testing

Test the following scenarios:
1. Login and verify localStorage contains tokens
2. Refresh page and verify user stays logged in
3. Try accessing protected routes without login - should redirect to login
4. Logout and verify localStorage is cleared
5. Test API calls to ensure Authorization header is sent
