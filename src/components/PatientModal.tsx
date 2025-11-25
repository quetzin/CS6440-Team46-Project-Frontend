import React, { useEffect, useState } from "react";
import type { Patient, TimeSeriesPoint } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Helper to format time for display
const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

// Helper to format lab/vital names for display
const formatLabName = (key: string): string => {
  const nameMap: Record<string, string> = {
    troponin: "Troponin",
    lactate: "Lactate",
    heartRate: "Heart Rate",
    bpSys: "Systolic BP",
    bpDia: "Diastolic BP",
    spo2: "SpO₂",
    respRate: "Respiratory Rate",
    temp: "Temperature",
    mixedVenousO2: "Mixed Venous O₂",
    pH: "pH",
    pO2: "pO₂",
    pCO2: "pCO₂",
    bnp: "BNP",
  };
  return nameMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
};

// Get appropriate units for each metric
const getUnit = (key: string): string => {
  const unitMap: Record<string, string> = {
    troponin: "ng/mL",
    lactate: "mmol/L",
    heartRate: "bpm",
    bpSys: "mmHg",
    bpDia: "mmHg",
    spo2: "%",
    respRate: "/min",
    temp: "°C",
    mixedVenousO2: "%",
    pO2: "mmHg",
    pCO2: "mmHg",
    bnp: "pg/mL",
  };
  return unitMap[key] || "";
};

export default function PatientModal({
  patient,
  onClose,
}: {
  patient: Patient;
  onClose: () => void;
}) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Get available metrics from timeSeries data
  const availableMetrics = patient.timeSeries 
    ? Object.keys(patient.timeSeries).filter(key => 
        patient.timeSeries![key] && patient.timeSeries![key].length > 0
      )
    : [];

  // Auto-select first metric if none selected
  useEffect(() => {
    if (availableMetrics.length > 0 && !selectedMetric) {
      setSelectedMetric(availableMetrics[0]);
    }
  }, [availableMetrics, selectedMetric]);

  // Prepare chart data for selected metric
  const chartData = selectedMetric && patient.timeSeries?.[selectedMetric]
    ? patient.timeSeries[selectedMetric].map(point => ({
        time: formatTime(point.time),
        value: point.value,
        fullTime: point.time,
      }))
    : [];

  // Shock/Emergency Labs (static display)
  const shockLabs = patient.latestLabs
    ? [
        { key: "mixedVenousO2", label: "Mixed Venous O₂ Saturation", value: patient.latestLabs.mixedVenousO2, unit: "%" },
        { key: "lactate", label: "Lactate", value: patient.latestLabs.lactate, unit: "mmol/L" },
        { key: "pH", label: "pH", value: patient.latestLabs.pH },
        { key: "pO2", label: "pO₂ Arterial", value: patient.latestLabs.pO2, unit: "mmHg" },
        { key: "pCO2", label: "pCO₂ Arterial", value: patient.latestLabs.pCO2, unit: "mmHg" },
        { key: "bnp", label: "B Natriuretic Peptide", value: patient.latestLabs.bnp },
      ].filter(lab => lab.value !== undefined)
    : [];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        onClick={onClose}
      />
      {/* Panel */}
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

        {/* Time Series Chart */}
        {availableMetrics.length > 0 && (
          <div className="mt-4">
            <div className="text-sm text-slate-500 mb-2 font-semibold">
              Time Series Data
            </div>
            <div className="bg-white rounded-xl p-4 shadow-soft ring-1 ring-slate-900/5">
              {/* Metric selector tabs */}
              <div className="flex flex-wrap gap-2 border-b border-gray-300 mb-4 pb-2">
                {availableMetrics.map((metric) => (
                  <button
                    key={metric}
                    className={`px-3 py-1 text-sm font-semibold rounded-t transition ${
                      selectedMetric === metric
                        ? "border-b-2 border-red-500 text-red-500"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    onClick={() => setSelectedMetric(metric)}
                  >
                    {formatLabName(metric)}
                  </button>
                ))}
              </div>

              {/* Chart */}
              {chartData.length > 0 ? (
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
                    >
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis 
                        dataKey="time" 
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        label={{ 
                          value: getUnit(selectedMetric!), 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { fontSize: 12 }
                        }}
                      />
                      <Tooltip 
                        formatter={(value: number) => [
                          `${value} ${getUnit(selectedMetric!)}`,
                          formatLabName(selectedMetric!)
                        ]}
                      />
                      <Legend 
                        formatter={() => formatLabName(selectedMetric!)}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name={formatLabName(selectedMetric!)}
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center text-slate-500 py-8">
                  No data available for this metric
                </div>
              )}
            </div>
          </div>
        )}

        {/* Shock/Emergency Labs */}
        {shockLabs.length > 0 && (
          <div className="mt-4">
            <div className="text-sm text-slate-500 mb-2 font-semibold">
              Latest Lab Values
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {shockLabs.map((lab) => (
                <Vital 
                  key={lab.key} 
                  label={lab.label} 
                  value={lab.value!} 
                  unit={lab.unit} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Show message if no data available */}
        {availableMetrics.length === 0 && shockLabs.length === 0 && (
          <div className="mt-4 text-center text-slate-500 py-8 bg-slate-50 rounded-lg">
            No time series or lab data available for this patient
          </div>
        )}

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
      <div className="text-base font-semibold">
        {typeof value === 'number' ? value.toFixed(1) : value}
        {unit ? ` ${unit}` : ''}
      </div>
    </div>
  );
}
