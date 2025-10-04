# React 前端 OAuth 集成指南

SystemQuest API 的 GitHub OAuth 认证流程 - 适用于纯 React SPA

## 架构说明

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   React     │  ────>  │ SystemQuest  │  ────>  │   GitHub    │
│   前端      │         │     API      │         │    OAuth    │
│ (Port 3001) │  <────  │ (Port 3000)  │  <────  │             │
└─────────────┘         └──────────────┘         └─────────────┘
```

## 为什么支持纯 React？

✅ **API 通过 URL 参数返回 tokens**
- 不需要服务端渲染
- 不需要 Cookie
- 完全基于客户端

## React 前端实现

### 1. 登录页面组件

```typescript
// src/pages/Login.tsx
import { useState } from 'react'

const API_BASE_URL = 'http://localhost:3000'

export default function Login() {
  const [loading, setLoading] = useState(false)
  
  const handleGitHubLogin = async () => {
    setLoading(true)
    
    try {
      // 1. 调用 API 获取 GitHub OAuth URL
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/github`)
      const data = await response.json()
      
      // 2. 跳转到 GitHub 授权页面
      window.location.href = data.authUrl
      
    } catch (error) {
      console.error('Login failed:', error)
      setLoading(false)
    }
  }
  
  return (
    <div className="login-container">
      <h1>Welcome to SystemQuest</h1>
      <button 
        onClick={handleGitHubLogin}
        disabled={loading}
      >
        {loading ? 'Redirecting...' : 'Login with GitHub'}
      </button>
    </div>
  )
}
```

### 2. OAuth 回调处理页面

```typescript
// src/pages/AuthCallback.tsx
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    // 1. 从 URL 参数获取 tokens
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const error = searchParams.get('error')
    
    if (error) {
      console.error('OAuth error:', error)
      navigate('/login?error=' + error)
      return
    }
    
    if (accessToken && refreshToken) {
      // 2. 存储 tokens 到 localStorage
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
      
      // 3. 跳转到首页
      navigate('/dashboard')
    } else {
      navigate('/login?error=missing_tokens')
    }
  }, [searchParams, navigate])
  
  return (
    <div className="callback-container">
      <h2>Authenticating...</h2>
      <p>Please wait while we complete your login.</p>
    </div>
  )
}
```

### 3. API 客户端封装

```typescript
// src/lib/api.ts
const API_BASE_URL = 'http://localhost:3000'

class ApiClient {
  private getAccessToken(): string | null {
    return localStorage.getItem('access_token')
  }
  
  private async refreshAccessToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) return null
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      })
      
      const data = await response.json()
      
      if (data.accessToken) {
        localStorage.setItem('access_token', data.accessToken)
        return data.accessToken
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
    }
    
    return null
  }
  
  async fetch(endpoint: string, options: RequestInit = {}) {
    let accessToken = this.getAccessToken()
    
    const headers = {
      'Content-Type': 'application/json',
      ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
      ...options.headers,
    }
    
    let response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })
    
    // 如果 401，尝试刷新 token
    if (response.status === 401) {
      accessToken = await this.refreshAccessToken()
      
      if (accessToken) {
        // 重试请求
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: {
            ...headers,
            'Authorization': `Bearer ${accessToken}`,
          },
        })
      } else {
        // 刷新失败，跳转到登录页
        window.location.href = '/login?error=session_expired'
      }
    }
    
    return response
  }
  
  async get(endpoint: string) {
    const response = await this.fetch(endpoint)
    return response.json()
  }
  
  async post(endpoint: string, data: any) {
    const response = await this.fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.json()
  }
  
  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.href = '/login'
  }
}

export const api = new ApiClient()
```

### 4. 使用 API 客户端

```typescript
// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState([])
  
  useEffect(() => {
    // 获取当前用户
    api.get('/api/v1/auth/me')
      .then(data => setUser(data))
      .catch(err => console.error('Failed to load user:', err))
    
    // 获取课程列表
    api.get('/api/v1/courses?include=stages,languages')
      .then(data => setCourses(data.data))
      .catch(err => console.error('Failed to load courses:', err))
  }, [])
  
  return (
    <div className="dashboard">
      <header>
        <h1>Welcome, {user?.username}!</h1>
        <button onClick={() => api.logout()}>Logout</button>
      </header>
      
      <div className="courses">
        <h2>Available Courses</h2>
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
```

### 5. React Router 配置

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AuthCallback from './pages/AuthCallback'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

## OAuth 测试工具 vs 真实前端

### OAuth 测试工具（Express）

- ✅ **用途**: 快速测试 API 功能
- ✅ **优势**: 
  - 一键启动，自动打开浏览器
  - 可视化展示所有 API 端点
  - 无需搭建完整前端项目
  - 适合后端开发阶段

### 真实 React 前端

- ✅ **用途**: 生产环境应用
- ✅ **实现**: 
  - 纯客户端代码
  - 通过 Vite/CRA 构建
  - 部署到 CDN/静态托管
  - 完整的用户体验

## 总结

1. **API 完全支持纯 React SPA** ✅
   - Tokens 通过 URL 参数传递
   - 不依赖服务端 Cookie
   - 不需要 SSR

2. **OAuth 测试工具使用 Express** 🔧
   - 仅用于开发测试
   - 模拟前端应用行为
   - 提供可视化测试界面

3. **生产环境推荐** 🚀
   - React SPA (Vite + React Router)
   - 静态部署到 Vercel/Netlify
   - API 独立部署
   - 完全前后端分离

## 下一步

如果需要，我可以帮你创建一个完整的 React 前端示例项目！
