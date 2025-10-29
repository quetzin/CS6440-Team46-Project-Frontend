import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Demo validation
      if (email === 'demo@icu.com' && password === 'demo123') {
        // Store auth token (in real app, use secure storage)
        localStorage.setItem('authToken', 'demo-token')
        navigate('/')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500 mb-4">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">ICU Wallboard</h1>
          <p className="text-slate-600 mt-2">Sign in to access patient monitoring</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-soft ring-1 ring-slate-900/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="you@hospital.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-slate-300 rounded"
                />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-semibold text-blue-900 mb-1">Demo Credentials:</p>
            <p className="text-xs text-blue-700">Email: demo@icu.com</p>
            <p className="text-xs text-blue-700">Password: demo123</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Need access?{' '}
          <button className="text-red-600 hover:text-red-700 font-medium">
            Contact IT Support
          </button>
        </p>
      </div>
    </div>
  )
}