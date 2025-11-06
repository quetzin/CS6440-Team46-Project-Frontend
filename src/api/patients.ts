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
    status: "normal",
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
    status: "normal",
    vitals: { heartRate: 70, bpSys: 120, bpDia: 80, spo2: 98, respRate: 17, temp: 36.7 },
  },
  {
    id: "p-5",
    name: "Ryan Lee",
    age: 39,
    sex: "Male",
    weightLb: 170,
    status: "normal",
    vitals: { heartRate: 70, bpSys: 120, bpDia: 80, spo2: 98, respRate: 17, temp: 36.7 },
  },
  {
    id: "p-6",
    name: "Ryan Lee",
    age: 39,
    sex: "Male",
    weightLb: 170,
    status: "normal",
    vitals: { heartRate: 70, bpSys: 120, bpDia: 80, spo2: 98, respRate: 17, temp: 36.7 },
  },
  {
    id: "p-7",
    name: "Ryan Lee",
    age: 39,
    sex: "Male",
    weightLb: 170,
    status: "normal",
    vitals: { heartRate: 70, bpSys: 120, bpDia: 80, spo2: 98, respRate: 17, temp: 36.7 },
  },
  {
    id: "p-8",
    name: "Maria Gomez",
    age: 53,
    sex: "Female",
    weightLb: 150,
    status: "critical",
    vitals: { heartRate: 110, bpSys: 155, bpDia: 100, spo2: 88, respRate: 30, temp: 38.5 },
  },
  {
    id: "p-9",
    name: "Maria Gomez",
    age: 53,
    sex: "Female",
    weightLb: 150,
    status: "critical",
    vitals: { heartRate: 110, bpSys: 155, bpDia: 100, spo2: 88, respRate: 30, temp: 38.5 },
  },
  {
    id: "p-10",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
  {
    id: "p-11",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
  {
    id: "p-12",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
    {
    id: "p-13",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
    {
    id: "p-14",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
  {
    id: "p-15",
    name: "David Smith",
    age: 63,
    sex: "Male",
    weightLb: 180,
    status: "abnormal",
    vitals: { heartRate: 92, bpSys: 138, bpDia: 85, spo2: 95, respRate: 22, temp: 37.3 },
  },
  {
    id: "p-16",
    name: "Maria Gomez",
    age: 53,
    sex: "Female",
    weightLb: 150,
    status: "critical",
    vitals: { heartRate: 110, bpSys: 155, bpDia: 100, spo2: 88, respRate: 30, temp: 38.5 },
  },
  {
    id: "p-17",
    name: "Maria Gomez",
    age: 53,
    sex: "Female",
    weightLb: 150,
    status: "critical",
    vitals: { heartRate: 110, bpSys: 155, bpDia: 100, spo2: 88, respRate: 30, temp: 38.5 },
  },
  
];

/**export async function listPatients(): Promise<Patient[]> {
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
*/

// Function to clear session and redirect to login
function logout() {
  // Remove session data or tokens
  sessionStorage.removeItem('authToken');
  localStorage.removeItem('authToken');
  // Redirect to login page
  window.location.href = '/login'; // Or use react-router: history.push('/login');
}
// Example of your existing functions
export async function listPatients(): Promise<Patient[]> {
  const res = await fetch("http://localhost:8000/api/patients", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load patients");
  return res.json();
}

export async function getPatient(id: string): Promise<Patient> {
  const res = await fetch(`http://localhost:8000/api/patients/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load patient");
  return res.json();
}

// Higher-order function to add auth check
function withAuthCheck<T extends (...args: any[]) => Promise<any>>(fetchFunc: T): T {
  return async function (...args: any[]) {
    try {
      return await fetchFunc(...args);
    } catch (error) {
      // Handle authentication errors
      if (error instanceof Error && (error.message.includes("Failed to load") || error.message.includes("Session expired"))) {
        logout(); // Log out the user
      }
      throw error;
    }
  } as T;
}

// Wrapping the functions
export const listPatientsWithAuthCheck = withAuthCheck(listPatients);
export const getPatientWithAuthCheck = withAuthCheck(getPatient);

// Usage
//const patients = await listPatientsWithAuthCheck();
//const patient = await getPatientWithAuthCheck("186ff984-f437-4817-8d35-0997a8b7f405");
