# 401 Unauthorized - Debugging Guide

## Step 1: Verify Token is Stored in localStorage

1. Open Browser DevTools (F12)
2. Go to **Console** tab
3. Run these commands:

```javascript
// Check if token exists
console.log(localStorage.getItem('auth_accessToken'));

// Check all auth keys
Object.keys(localStorage).filter(k => k.startsWith('auth_'));

// Check all localStorage items
JSON.parse(JSON.stringify(localStorage));
```

**Expected Output**: Should show your token string (looks like a long JWT)

---

## Step 2: Verify API Request Headers

1. Open Browser DevTools (F12)
2. Go to **Network** tab
3. Call the API again (refresh page or trigger the request)
4. Find the `leads/all` request
5. Click on it and check the **Headers** tab

**Look for:**
```
Authorization: <your-token-here>
```

**If Authorization header is missing:**
- Token is not stored in localStorage
- You need to log in first

---

## Step 3: Check Login Response

1. Open DevTools → **Network** tab
2. Go to Login page and submit form
3. Find the `auth/login` request
4. Click it and check **Response** tab

**Should look like:**
```json
{
  "success": true,
  "authorization": {
    "access_token": "eyJhbGc...",
    "refresh_token": "eyJhbGc..."
  },
  "userid": "123",
  "type": "SUP_ADMIN",
  "email": "user@example.com"
}
```

**If this is missing or different:**
- Backend response format is different
- Need to adjust Login.tsx to match backend response

---

## Step 4: Check localStorage After Login

After login, check localStorage:

```javascript
// Should exist
localStorage.getItem('auth_accessToken');
localStorage.getItem('auth_userRole');
localStorage.getItem('auth_user');
```

---

## Step 5: Test API with Console

```javascript
// Get the token
const token = localStorage.getItem('auth_accessToken');

// Try manual API call
fetch('http://192.168.7.27:6003/api/leads/all?page=1&limit=10', {
  headers: {
    'Authorization': token,
    'Content-Type': 'application/json'
  },
  credentials: 'include'
})
.then(r => r.json())
.then(d => console.log(d))
.catch(e => console.error(e));
```

---

## Common Issues & Fixes

### Issue 1: Token is NOT in localStorage after login

**Possible Causes:**
- Login response structure is different
- Backend is not returning `authorization.access_token`
- Frontend is not storing it correctly

**Fix:**
1. Check network response of login request
2. Adjust Login.tsx to match your backend response format
3. Verify the response contains the token

### Issue 2: Token is in localStorage but still getting 401

**Possible Causes:**
- Token is expired or invalid
- Token format is wrong (should be JWT, not wrapped)
- API endpoint expects different header format
- CORS issue

**Fix:**
1. Try logging in again to get a fresh token
2. Check token format in localStorage (should start with `eyJ`)
3. Ask backend team if token needs `Bearer ` prefix
4. Check backend CORS configuration

### Issue 3: "Bearer" token format needed

If your API requires `Authorization: Bearer <token>`:

Edit **baseApi.ts** line:
```typescript
// Change this:
headers.set("authorization", token);

// To this:
headers.set("authorization", `Bearer ${token}`);
```

### Issue 4: API endpoint format wrong

The API call shows: `GET /api/leads/all?page=1&limit=10`

If your backend expects different format:
- Edit **dashboardOverView.ts** URL
- Change `"leads/all"` to match your endpoint

---

## Step 6: Check Browser Console

After making an API request, check browser console for logs:

```
✅ Authorization header set with token
📤 Fetching leads with params: {page: 1, limit: 10}
✅ Dashboard response: {...}
```

**If you see:**
```
⚠️  No token found in localStorage
```

This means token is not being stored during login.

---

## Step 7: Verify Backend Configuration

Ask backend team to check:

1. **CORS Headers** - Are credentials allowed?
   ```
   Access-Control-Allow-Credentials: true
   Access-Control-Allow-Headers: Authorization, Content-Type
   ```

2. **Token Format** - Does API expect:
   - `Authorization: <token>` (plain)
   - `Authorization: Bearer <token>` (with Bearer)
   - `Authorization: token <token>` (other format)

3. **Token Validation** - Is the token:
   - Expired?
   - Revoked?
   - Issued to correct user?

---

## Complete Testing Flow

```javascript
// 1. Check token exists
const token = localStorage.getItem('auth_accessToken');
console.log('Token:', token ? 'EXISTS ✅' : 'MISSING ❌');

// 2. Check token format
console.log('Token starts with eyJ?', token?.startsWith('eyJ') ? '✅' : '❌');

// 3. Make manual test request
fetch('http://192.168.7.27:6003/api/leads/all?page=1', {
  method: 'GET',
  headers: {
    'Authorization': token,
    'Content-Type': 'application/json'
  },
  credentials: 'include'
})
.then(r => {
  console.log('Status:', r.status);
  return r.json();
})
.then(d => console.log('Response:', d))
.catch(e => console.error('Error:', e));
```

---

## Still Getting 401?

Please provide:
1. Login API response (from Network tab)
2. Dashboard API request headers (from Network tab)
3. What's in localStorage after login
4. Backend team's token format requirement
