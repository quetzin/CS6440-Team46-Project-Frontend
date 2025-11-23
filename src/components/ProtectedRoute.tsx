import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('authToken')

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />
  }

  return <>{children}</>
}