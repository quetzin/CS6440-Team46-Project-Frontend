import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <Activity className="h-6 w-6 text-red-500" />
          <h1 className="font-semibold text-lg">ICU Wallboard — Patients</h1>
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-7xl w-full p-4">
        <Outlet />
      </main>
    </div>
  )
}