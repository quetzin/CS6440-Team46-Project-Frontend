import React from 'react'
import type { Status } from '../types'

const map: Record<Status, string> = {
  ok: 'bg-emerald-500',
  abnormal: 'bg-yellow-400',
  critical: 'bg-red-500'
}

export default function StatusLight({ status, size='md' }:{ status: Status, size?: 'sm'|'md'|'lg'}) {
  const dims = size==='lg' ? 'h-16 w-16' : size==='sm' ? 'h-6 w-6' : 'h-10 w-10'
  return <div className={`rounded-full ${dims} ${map[status]} shadow-soft ring-4 ring-black/10`} />
}