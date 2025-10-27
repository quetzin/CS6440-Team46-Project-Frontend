// import type { Patient } from '../types'

// export async function listPatients(): Promise<Patient[]> {
//   const res = await fetch('/api/patients');
//   if (!res.ok) throw new Error('Failed to load patients');
//   return res.json();
// }

// export async function getPatient(id: string): Promise<Patient> {
//   const res = await fetch(`/api/patients/${id}`);
//   if (!res.ok) throw new Error('Failed to load patient');
//   return res.json();
// }

// src/api/patients.ts

import type { Patient } from "../types";

const demoPatients: Patient[] = [
  {
    id: "p-1",
    name: "Alice Johnson",
    age: 45,
    sex: "Female",
    weightLb: 135,
    status: "ok",
    vitals: { heartRate: 72, bpSys: 118, bpDia: 76, spo2: 99, respRate: 16, temp: 36.8 },
  },
  {
    id: "p-2",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
  {
    id: "p-3",
    name: "Maria Gomez",
    age: 53,
    sex: "Female",
    weightLb: 150,
    status: "critical",
    vitals: { heartRate: 110, bpSys: 155, bpDia: 100, spo2: 88, respRate: 30, temp: 38.5 },
  },
  {
    id: "p-4",
    name: "Ryan Lee",
    age: 39,
    sex: "Male",
    weightLb: 170,
    status: "ok",
    vitals: { heartRate: 70, bpSys: 120, bpDia: 80, spo2: 98, respRate: 17, temp: 36.7 },
  },
  {
    id: "p-4",
    name: "Ryan Lee",
    age: 39,
    sex: "Male",
    weightLb: 170,
    status: "ok",
    vitals: { heartRate: 70, bpSys: 120, bpDia: 80, spo2: 98, respRate: 17, temp: 36.7 },
  },
  {
    id: "p-4",
    name: "Ryan Lee",
    age: 39,
    sex: "Male",
    weightLb: 170,
    status: "ok",
    vitals: { heartRate: 70, bpSys: 120, bpDia: 80, spo2: 98, respRate: 17, temp: 36.7 },
  },
  {
    id: "p-4",
    name: "Ryan Lee",
    age: 39,
    sex: "Male",
    weightLb: 170,
    status: "ok",
    vitals: { heartRate: 70, bpSys: 120, bpDia: 80, spo2: 98, respRate: 17, temp: 36.7 },
  },
  {
    id: "p-3",
    name: "Maria Gomez",
    age: 53,
    sex: "Female",
    weightLb: 150,
    status: "critical",
    vitals: { heartRate: 110, bpSys: 155, bpDia: 100, spo2: 88, respRate: 30, temp: 38.5 },
  },
  {
    id: "p-3",
    name: "Maria Gomez",
    age: 53,
    sex: "Female",
    weightLb: 150,
    status: "critical",
    vitals: { heartRate: 110, bpSys: 155, bpDia: 100, spo2: 88, respRate: 30, temp: 38.5 },
  },
  {
    id: "p-2",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
  {
    id: "p-2",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
  {
    id: "p-2",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
    {
    id: "p-2",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
    {
    id: "p-2",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
  {
    id: "p-2",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
  {
    id: "p-3",
    name: "Maria Gomez",
    age: 53,
    sex: "Female",
    weightLb: 150,
    status: "critical",
    vitals: { heartRate: 110, bpSys: 155, bpDia: 100, spo2: 88, respRate: 30, temp: 38.5 },
  },
  {
    id: "p-3",
    name: "Maria Gomez",
    age: 53,
    sex: "Female",
    weightLb: 150,
    status: "critical",
    vitals: { heartRate: 110, bpSys: 155, bpDia: 100, spo2: 88, respRate: 30, temp: 38.5 },
  },
  
];

export async function listPatients(): Promise<Patient[]> {
  // simulate API latency
  return new Promise((resolve) => setTimeout(() => resolve(demoPatients), 300));
}

export async function getPatient(id: string): Promise<Patient> {
  const patient = demoPatients.find((p) => p.id === id);
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (patient) resolve(patient);
      else reject(new Error("Patient not found"));
    }, 200)
  );
}
