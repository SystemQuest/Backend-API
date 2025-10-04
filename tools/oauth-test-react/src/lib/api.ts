const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

interface ApiResponse<T = any> {
  data?: T
  error?: {
    code: string
    message: string
  }
}

class ApiClient {
  private getAccessToken(): string | null {
    return localStorage.getItem('access_token')
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token')
  }

  private async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return null

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
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

  async fetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    let accessToken = this.getAccessToken()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    }

    let response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    // 如果 401，尝试刷新 token
    if (response.status === 401 && accessToken) {
      accessToken = await this.refreshAccessToken()

      if (accessToken) {
        // 重试请求
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        })
      } else {
        // 刷新失败，跳转到登录页
        window.location.href = '/login?error=session_expired'
        throw new Error('Session expired')
      }
    }

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || { code: 'UNKNOWN_ERROR', message: 'An error occurred' } }
    }

    return { data }
  }

  async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint)
  }

  async post<T = any>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.href = '/login'
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }
}

export const api = new ApiClient()
export { API_BASE_URL }
