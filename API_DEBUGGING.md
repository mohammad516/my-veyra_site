# API Debugging Guide

## Current Issue
The contact form is getting "Unexpected token '<', "<!DOCTYPE "... is not valid JSON" error, which means the API route is returning HTML instead of JSON.

## Debugging Steps

### 1. Test Basic API Routing
First, test if API routing is working at all:

1. **Visit the test endpoint**: Navigate to `http://localhost:3000/api/test` in your browser
   - You should see: `{"message":"API is working!"}`
   - If you see HTML or get a 404, there's a fundamental routing issue

2. **Test with curl or Postman**:
   ```bash
   curl http://localhost:3000/api/test
   ```

### 2. Test Contact API Route
Test the contact API route directly:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### 3. Check Server Console
Look at your terminal where `npm run dev` is running for:
- "Contact API route called" message
- Any error messages
- Request body parsing logs

### 4. Check Browser Network Tab
1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit the contact form
4. Look for the request to `/api/contact`
5. Check the Response tab to see what's actually being returned

### 5. Common Issues & Solutions

#### Issue: API route not found (404)
**Symptoms**: Getting HTML instead of JSON
**Solutions**:
- Ensure the file is at `app/api/contact/route.ts` (not `route.js`)
- Restart the development server
- Check for TypeScript compilation errors

#### Issue: Turbopack compatibility
**Symptoms**: Works with regular Next.js but not with Turbopack
**Solutions**:
- I've already disabled Turbopack in package.json
- Restart the server with `npm run dev` (without --turbopack)

#### Issue: Environment variable not loaded
**Symptoms**: "Email service is not configured" error
**Solutions**:
- Create `.env.local` file in project root
- Add `RESEND_API_KEY=your_key_here`
- Restart the development server

#### Issue: TypeScript compilation error
**Symptoms**: Route file not being recognized
**Solutions**:
- Check for TypeScript errors in the route file
- Ensure all imports are correct
- Try renaming to `route.js` temporarily

### 6. Expected Behavior

#### Successful API Call:
- Server console shows: "Contact API route called"
- Server console shows: "Request body parsed: {...}"
- Response: `{"success":true,"message":"Email sent successfully"}`

#### Failed API Call:
- Server console shows error details
- Response: `{"error":"specific error message"}`

### 7. Next Steps

1. **Test the basic API route** (`/api/test`) first
2. **Check server console** for any error messages
3. **Test contact API** with curl/Postman
4. **Check browser network tab** for actual responses
5. **Verify file structure** is correct

### 8. File Structure Check

Ensure your project structure looks like this:
```
mysite/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts
│   │   └── test/
│   │       └── route.ts
│   ├── components/
│   ├── page.tsx
│   └── layout.tsx
├── package.json
└── .env.local
```

### 9. If Still Not Working

1. **Check Next.js version compatibility**
2. **Try creating a minimal route** to isolate the issue
3. **Check for any middleware** that might be interfering
4. **Verify TypeScript configuration**
5. **Check for any build errors**

Let me know what you find in each step, and I'll help you resolve the issue!
