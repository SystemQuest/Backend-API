import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import './Dashboard.css'

interface User {
  id: string
  username: string
  email: string
  name: string
  avatarUrl: string
  githubId: string
}

interface TestResult {
  endpoint: string
  status: 'success' | 'error' | 'loading'
  data?: any
  error?: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [testResults, setTestResults] = useState<TestResult[]>([])

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/login')
      return
    }

    loadUser()
  }, [navigate])

  const loadUser = async () => {
    setLoading(true)
    const result = await api.get<User>('/v1/auth/me')

    if (result.error) {
      console.error('Failed to load user:', result.error)
      navigate('/login?error=' + result.error.message)
    } else if (result.data) {
      setUser(result.data)
    }

    setLoading(false)
  }

  const handleLogout = () => {
    api.logout()
  }

  const testEndpoint = async (endpoint: string, description: string) => {
    const testId = `${endpoint}-${Date.now()}`

    setTestResults(prev => [
      ...prev,
      { endpoint: description, status: 'loading' }
    ])

    try {
      const result = await api.get(endpoint)

      setTestResults(prev =>
        prev.map((test, index) =>
          index === prev.length - 1
            ? {
                endpoint: description,
                status: result.error ? 'error' : 'success',
                data: result.data,
                error: result.error?.message
              }
            : test
        )
      )
    } catch (error: any) {
      setTestResults(prev =>
        prev.map((test, index) =>
          index === prev.length - 1
            ? {
                endpoint: description,
                status: 'error',
                error: error.message
              }
            : test
        )
      )
    }
  }

  const clearResults = () => {
    setTestResults([])
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🧪 OAuth Test Dashboard</h1>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="user-card">
          <h2>👤 User Information</h2>
          <div className="user-info">
            {user?.avatarUrl && (
              <img src={user.avatarUrl} alt="Avatar" className="avatar" />
            )}
            <div className="user-details">
              <div className="info-row">
                <span className="label">Username:</span>
                <span className="value">{user?.username}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{user?.email}</span>
              </div>
              <div className="info-row">
                <span className="label">GitHub ID:</span>
                <span className="value">{user?.githubId}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="tokens-card">
          <h2>🔑 JWT Tokens</h2>
          <div className="token-info">
            <div className="token-item">
              <span className="token-label">Access Token (1h):</span>
              <code className="token-value">
                {localStorage.getItem('access_token')}
              </code>
            </div>
            <div className="token-item">
              <span className="token-label">Refresh Token (7d):</span>
              <code className="token-value">
                {localStorage.getItem('refresh_token')}
              </code>
            </div>
          </div>
        </div>

        <div className="test-card">
          <div className="test-header">
            <h2>🧪 API Testing</h2>
            {testResults.length > 0 && (
              <button className="clear-button" onClick={clearResults}>
                Clear Results
              </button>
            )}
          </div>

          <div className="test-buttons">
            <button
              className="test-button"
              onClick={() => testEndpoint('/v1/auth/me', 'GET /auth/me')}
            >
              Test GET /auth/me
            </button>
            <button
              className="test-button"
              onClick={() => testEndpoint('/v1/courses', 'GET /courses')}
            >
              Test GET /courses
            </button>
            <button
              className="test-button"
              onClick={() =>
                testEndpoint(
                  '/v1/courses?include=stages,languages',
                  'GET /courses?include=stages,languages'
                )
              }
            >
              Test GET /courses (with includes)
            </button>
            <button
              className="test-button"
              onClick={() => testEndpoint('/v1/languages', 'GET /languages')}
            >
              Test GET /languages
            </button>
          </div>

          {testResults.length > 0 && (
            <div className="test-results">
              <h3>Test Results</h3>
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`result-item result-${result.status}`}
                >
                  <div className="result-header">
                    <span className="result-endpoint">{result.endpoint}</span>
                    <span className={`result-status status-${result.status}`}>
                      {result.status === 'loading' && '⏳ Loading...'}
                      {result.status === 'success' && '✅ Success'}
                      {result.status === 'error' && '❌ Error'}
                    </span>
                  </div>
                  {result.status !== 'loading' && (
                    <div className="result-body">
                      {result.error && (
                        <div className="error-text">{result.error}</div>
                      )}
                      {result.data && (
                        <pre className="result-data">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
