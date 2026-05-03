# LocalStorage Authentication - Usage Examples

## Example 1: Using Logout Hook in a Component

```tsx
'use client';

import { useLogout } from '@/hooks/useLogout';

export function UserMenu() {
  const { logout } = useLogout();

  return (
    <div>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}
```

## Example 2: Getting User Info in a Component

```tsx
'use client';

import { StorageHelper } from '@/helper/storage.helper';
import { useEffect, useState } from 'react';

export function UserProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = StorageHelper.getUser();
    setUser(userData);
  }, []);

  return (
    <div>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
```

## Example 3: Checking Authentication Status

```tsx
'use client';

import { StorageHelper } from '@/helper/storage.helper';
import { useEffect, useState } from 'react';

export function ProtectedContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = StorageHelper.getAccessToken();
    const role = StorageHelper.getUserRole();
    setIsAuthenticated(Boolean(token && role));
  }, []);

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return <p>You are authenticated!</p>;
}
```

## Example 4: Accessing Auth Data in API Calls

```tsx
'use client';

import { useGetDashboardOverviewQuery } from '@/redux/features/dashboardOverview/dashboardOverView';

export function DashboardData() {
  const { data, isLoading, error } = useGetDashboardOverviewQuery({
    page: 1,
    limit: 10,
    search: "",
    trade_id: "",
    status: "",
  });

  // The Authorization header is automatically added by baseApi
  // No need to manually add token

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return <div>{/* Render data */}</div>;
}
```

## Example 5: Storing Additional User Data

```tsx
// After successful login
import { StorageHelper } from '@/helper/storage.helper';

StorageHelper.setItem('userPreferences', {
  theme: 'dark',
  language: 'en',
  notifications: true,
});

// Retrieve it later
const preferences = StorageHelper.getParsedItem('userPreferences');
```

## Example 6: Conditional Rendering Based on Role

```tsx
'use client';

import { StorageHelper } from '@/helper/storage.helper';
import { useEffect, useState } from 'react';

export function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = StorageHelper.getUser();
    setIsAdmin(user?.role === 'admin');
  }, []);

  if (!isAdmin) {
    return <p>Access denied</p>;
  }

  return <div>{/* Admin content */}</div>;
}
```

## Example 7: Clearing Specific Auth Data

```tsx
import { StorageHelper } from '@/helper/storage.helper';

// Clear all auth data
StorageHelper.clear();

// Remove specific item
StorageHelper.removeItem('accessToken');
```

## Example 8: Handling Token Expiration

```tsx
'use client';

import { StorageHelper } from '@/helper/storage.helper';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function TokenExpirationHandler() {
  const router = useRouter();

  useEffect(() => {
    // Check token periodically
    const interval = setInterval(() => {
      const token = StorageHelper.getAccessToken();
      
      if (!token) {
        // Token expired or cleared
        router.push('/log-in');
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [router]);

  return null;
}
```

## Key Points to Remember

1. **Always check if window is defined** - StorageHelper already handles this
2. **Use "use client" directive** - Components accessing localStorage need this
3. **Put useAuthProtection at root level** - It's already in AuthProtectionWrapper
4. **Call StorageHelper.clear() on logout** - Use useLogout hook
5. **Token is sent automatically** - baseApi handles Authorization header

## Common Errors

### "localStorage is not defined"
**Cause**: Trying to access localStorage on server-side code
**Solution**: Add `'use client'` to component and ensure it only runs in browser

### "Cannot read property 'getUser' of undefined"
**Cause**: Calling StorageHelper before window is available
**Solution**: Use useEffect to call StorageHelper after component mounts

### "401 Unauthorized on API calls"
**Cause**: Token not stored or expired
**Solution**: Check browser DevTools > Application > Local Storage for `auth_accessToken`
