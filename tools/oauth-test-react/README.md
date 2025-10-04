# React OAuth Test Tool

A pure React single-page application (SPA) that demonstrates OAuth authentication integration with the SystemQuest API.

## Overview

This tool showcases how to integrate GitHub OAuth authentication with the SystemQuest API in a client-side React application. It demonstrates:

- **OAuth Flow**: Complete GitHub OAuth flow handling
- **Token Management**: JWT token storage and automatic refresh
- **API Integration**: Making authenticated requests to the API
- **Error Handling**: Proper error handling for authentication and API calls

## Architecture

Unlike the Express-based OAuth test tool which runs a Node.js server, this is a **pure client-side application** that runs entirely in the browser. This demonstrates the recommended architecture for production SPAs.

### Key Features

1. **URL Parameter Token Delivery**: Receives tokens via URL parameters after OAuth callback
2. **LocalStorage Persistence**: Stores tokens securely in browser's localStorage
3. **Automatic Token Refresh**: Detects 401 errors and refreshes tokens automatically
4. **React Router Navigation**: Client-side routing with protected routes

## Tech Stack

- **React 19**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **React Router 7**: Client-side routing

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Running SystemQuest API on `http://localhost:3000`

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Configuration

The API base URL can be configured in `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Usage

### 1. Login

- Open `http://localhost:5173`
- Click "Login with GitHub"
- Authorize the application
- You'll be redirected back with tokens

### 2. Dashboard

After successful login, you'll see:

- **User Information**: GitHub profile with avatar
- **JWT Tokens**: Access and refresh tokens (truncated for security)
- **API Testing**: Buttons to test various API endpoints

### 3. Test API Endpoints

Click any button to test an endpoint:

- **Get Current User** - `GET /api/v1/auth/me`
- **Get Courses** - `GET /api/v1/courses`
- **Get Course Detail** - `GET /api/v1/courses/websocket-server`
- **Get Languages** - `GET /api/v1/languages`

Results are displayed below in JSON format.

## Code Structure

```
src/
├── lib/
│   └── api.ts              # API client with token management
├── pages/
│   ├── Login.tsx           # Login page with GitHub OAuth button
│   ├── Login.css
│   ├── AuthCallback.tsx    # OAuth callback handler
│   ├── AuthCallback.css
│   ├── Dashboard.tsx       # Main dashboard with API tests
│   └── Dashboard.css
├── App.tsx                 # Router configuration
└── main.tsx               # App entry point
```

## How It Works

### OAuth Flow

1. **Initiate**: User clicks "Login with GitHub" → Calls `GET /api/v1/auth/github`
2. **Redirect**: API returns GitHub OAuth URL → Browser redirects to GitHub
3. **Authorize**: User authorizes → GitHub redirects to API callback
4. **Tokens**: API generates JWT tokens → Redirects to frontend with tokens in URL
5. **Store**: Frontend extracts tokens from URL → Stores in localStorage
6. **Navigate**: Redirects to dashboard

### Token Refresh Flow

1. **API Request**: Makes request with access token
2. **401 Error**: API returns 401 (token expired)
3. **Refresh**: Automatically calls `POST /api/v1/auth/refresh` with refresh token
4. **Update**: Stores new tokens and retries original request
5. **Retry**: Original request succeeds with new token

## Comparison: React vs Express

| Feature | React Tool (This) | Express Tool |
|---------|-------------------|--------------|
| **Type** | Client-side SPA | Server-side app |
| **Token Storage** | localStorage | Session cookies |
| **Refresh** | Automatic on 401 | Manual via endpoint |
| **Routing** | React Router | Express routes |
| **Architecture** | Production-ready | Testing only |

## Key Differences from Express Version

1. **No Server**: Runs entirely in browser, no Node.js server needed
2. **URL Tokens**: Receives tokens via URL parameters (not cookies)
3. **Client Storage**: Uses localStorage (not server sessions)
4. **Auto Refresh**: Built-in automatic token refresh logic
5. **SPA Routing**: Client-side navigation with React Router

## Production Considerations

This tool demonstrates best practices for production SPAs:

✅ **Token Security**
- Access tokens stored in memory when possible
- Refresh tokens in localStorage
- Auto-cleanup on logout

✅ **Error Handling**
- Graceful degradation
- User-friendly error messages
- Automatic retry logic

✅ **User Experience**
- Loading states
- Responsive design
- Clear feedback

⚠️ **Security Notes**
- localStorage is accessible to JavaScript (XSS risk)
- Use HTTPS in production
- Consider httpOnly cookies for sensitive apps
- Implement CSP headers

## Related Documentation

- [API Design Documentation](../../docs/v2/api-design-part1.md)
- [React OAuth Integration Guide](../../docs/REACT_OAUTH_GUIDE.md)
- [Express OAuth Test Tool](../oauth-test/README.md)
