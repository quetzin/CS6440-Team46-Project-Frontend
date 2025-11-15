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

  //dummy Troponin data 
  const currentTroponinData = [
    { time: "08:00", troponin: 10 },
    { time: "12:00", troponin: 12 },
    { time: "16:00", troponin: 15 },
    { time: "20:00", troponin: 19 },
  ];

  const predictedTroponinData = currentTroponinData.map((d, i) => ({
    ...d,
    troponin: d.troponin + 1 + i, //dummy prediction
  }));

  //shock/Emergency Labs (dummy)
  const shockLabs = [
    { label: "Mixed Venous O₂ Saturation", value: 72, unit: "%" },
    { label: "Lactate", value: 1.8, unit: "mmol/L" },
    { label: "pH", value: 7.42 },
    { label: "pO₂ Arterial", value: 95, unit: "mmHg" },
    { label: "pCO₂ Arterial", value: 40, unit: "mmHg" },
    { label: "B Natriuretic Peptide", value: 200 },
  ];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        onClick={onClose}
      />
      {/* panel */}
      <div className="relative z-50 w-[92vw] max-w-2xl rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10 overflow-y-auto max-h-[90vh]">
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

        {/*Shock/Emergency Labs */}
        <div className="mt-4">
          <div className="text-sm text-slate-500 mb-2 font-semibold">
            Shock / Emergency Labs
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Troponin chart */}
            <div className="col-span-2 md:col-span-3 bg-white rounded-xl2 p-4 shadow-soft ring-1 ring-slate-900/5">
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
                    data={activeTab === "current" ? currentTroponinData : predictedTroponinData}
                    margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="troponin"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Other labs */}
            {shockLabs.map((lab) => (
              <Vital key={lab.label} label={lab.label} value={lab.value} unit={lab.unit} />
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-4">
          <div className="text-xs text-slate-500">Notes</div>
          <textarea
            className="mt-1 w-full border rounded-lg p-2 h-20 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="Enter notes…"
          />
        </div>
      </div>
    </div>
  );
}

function Vital({ label, value, unit }: { label: string; value: number | string; unit?: string }) {
  return (
    <div className="rounded-lg bg-slate-50 ring-1 ring-black/5 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-base font-semibold">{value}{unit ? ` ${unit}` : ''}</div>
    </div>
  );
}
