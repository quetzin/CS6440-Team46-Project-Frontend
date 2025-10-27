import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPatient } from '../api/patients'
import type { Patient } from '../types'
import StatusLight from '../components/StatusLight'

function Vital({label, value, unit}:{label:string, value:number|string, unit?:string}){
  return (
    <div className="bg-white rounded-xl2 p-4 shadow-soft ring-1 ring-slate-900/5">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-2xl font-semibold">{value}{unit?` ${unit}`:''}</div>
    </div>
  )
}

export default function PatientView(){
  const { id } = useParams()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(()=>{
    if(!id) return
    getPatient(id).then(setPatient).catch(e=>setError(e.message))
  },[id])
  if (error) return <div className="text-red-600">{error}</div>
  if (!patient) return <div>Loading…</div>
  const v = patient.vitals
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm text-blue-600 hover:underline">← Back</Link>
        <StatusLight status={patient.status} size="lg" />
        <div>
          <div className="text-xl font-semibold">{patient.name}</div>
          <div className="text-sm text-slate-500">{patient.age}y • {patient.sex} • {patient.weightLb} lb</div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Vital label="Heart Rate" value={v.heartRate} unit="bpm" />
        <Vital label="Blood Pressure" value={`${v.bpSys}/${v.bpDia}`} />
        <Vital label="SpO₂" value={v.spo2} unit="%" />
        <Vital label="Resp Rate" value={v.respRate} unit="/min" />
        <Vital label="Temp" value={v.temp} unit="°C" />
        <Vital label="Status" value={patient.status.toUpperCase()} />
      </div>
      <div className="bg-white rounded-xl2 p-4 shadow-soft ring-1 ring-slate-900/5">
        <div className="text-sm text-slate-500">Notes</div>
        <textarea className="mt-2 w-full border rounded-lg p-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-slate-400" placeholder="Enter notes…" />
      </div>
    </div>
  )
}