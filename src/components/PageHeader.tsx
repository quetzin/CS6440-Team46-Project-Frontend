import React from 'react'

export default function PageHeader({title, subtitle}:{title:string, subtitle?:string}){
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
    </div>
  )
}