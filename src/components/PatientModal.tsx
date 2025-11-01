import React, { useEffect, useState } from "react";
import type { Patient } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function PatientModal({
  patient,
  onClose,
}: {
  patient: Patient;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"current" | "predicted">("current");

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  //dummy hemoglobin data
  const dummyData = [
    { time: "08:00", hemoglobin: 12 },
    { time: "12:00", hemoglobin: 11.8 },
    { time: "16:00", hemoglobin: 11.5 },
    { time: "20:00", hemoglobin: 11.3 },
  ];

  const predictedData = dummyData.map((d, i) => ({
    ...d,
    hemoglobin: d.hemoglobin + 0.1 * (i + 1),
  }));

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        onClick={onClose}
      />
      {/* panel */}
      <div className="relative z-50 w-[92vw] max-w-2xl rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{patient.name}</h3>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="text-sm text-slate-600 mb-4">
          {patient.age}y • {patient.sex} • {patient.weightLb} lb
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Vital label="Heart Rate" value={patient.vitals.heartRate} />
          <Vital
            label="Blood Pressure"
            value={`${patient.vitals.bpSys}/${patient.vitals.bpDia}`}
          />
          <Vital label="SpO₂" value={patient.vitals.spo2} />
          <Vital label="Resp Rate" value={patient.vitals.respRate} />
          <Vital label="Temp" value={patient.vitals.temp} />
          <Vital label="Status" value={patient.status.toUpperCase()} />
        </div>

        {/* Hemoglobin Chart */}
        <div className="mt-4">
          <div className="flex border-b border-gray-300 mb-2">
            <button
              className={`px-4 py-1 font-semibold ${
                activeTab === "current"
                  ? "border-b-2 border-red-500 text-red-500"
                  : ""
              }`}
              onClick={() => setActiveTab("current")}
            >
              Current
            </button>
            <button
              className={`px-4 py-1 font-semibold ${
                activeTab === "predicted"
                  ? "border-b-2 border-red-500 text-red-500"
                  : ""
              }`}
              onClick={() => setActiveTab("predicted")}
            >
              Predicted
            </button>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={activeTab === "current" ? dummyData : predictedData}
                margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="hemoglobin"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-slate-500">Notes</div>
          <textarea
            className="mt-2 w-full border rounded-lg p-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="Enter notes…"
          />
        </div>
      </div>
    </div>
  );
}

function Vital({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg bg-slate-50 ring-1 ring-black/5 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}
