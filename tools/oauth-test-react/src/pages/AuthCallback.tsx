import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './AuthCallback.css'

export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const error = searchParams.get('error')

    if (error) {
      console.error('OAuth error:', error)
      navigate('/login?error=' + encodeURIComponent(error))
      return
    }

    if (accessToken && refreshToken) {
      // 存储 tokens
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)

      // 强制跳转到 dashboard，使用 replace 避免历史记录问题
      navigate('/dashboard', { replace: true })
    } else {
      navigate('/login?error=missing_tokens', { replace: true })
    }
  }, [searchParams, navigate])

  return (
    <div className="callback-container">
      <div className="callback-card">
        <div className="spinner-large"></div>
        <h2>Authenticating...</h2>
        <p>Please wait while we complete your login.</p>
      </div>
    </div>
  )
}
