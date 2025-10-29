import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Activity, LogOut } from 'lucide-react'

export default function App() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-red-500" />
            <h1 className="font-semibold text-lg">ICU Wallboard — Patients</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-7xl w-full p-4">
        <Outlet />
      </main>
    </div>
  )
}