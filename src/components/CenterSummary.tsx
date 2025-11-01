import React from "react";
import type { Patient } from "../types";

export default function CenterSummary({
  critical,
  abnormal,
  featured,
}: {
  critical: Patient[];
  abnormal: Patient[];
  featured: Patient | null;
}) {
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Critical column */}
      <div className="md:col-span-3">
        <h3 className="text-lg font-semibold">Critical</h3>
        <ul className="mt-2 text-sm space-y-1">
          {critical.length === 0 && <li className="text-slate-500">None</li>}
          {critical.map((p, i) => (
            <li key={p.id} className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
              {i + 1}. {p.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Featured patient column (middle, takes 2/3) */}
      <div className="md:col-span-6 rounded-lg bg-white ring-1 ring-black/5 p-6 flex flex-col items-center">
        <div className="text-center text-sm text-slate-500">Patient</div>
        <div className="text-center font-semibold text-xl mt-1">
          {featured ? featured.name : "—"}
        </div>
        {featured ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-6 gap-4 w-full">
            {/* Center the first two vitals */}
            <div className="sm:col-span-6 flex flex-wrap justify-center gap-4">
              <Vital label="Heart Rate" value={featured.vitals.heartRate} className="sm:col-span-2" />
              <Vital
                label="Blood Pressure"
                value={`${featured.vitals.bpSys}/${featured.vitals.bpDia}`}
                className="sm:col-span-3"
              />
            </div>

            {/* Other vitals */}
            <Vital label="Oxygen Saturation" value={featured.vitals.spo2} className="sm:col-span-2" />
            <Vital label="Resp Rate" value={featured.vitals.respRate} className="sm:col-span-2" />
            <Vital label="Temp" value={featured.vitals.temp} className="sm:col-span-2" />
          </div>
        ) : (
          <div className="mt-4 text-center text-slate-500">No data</div>
        )}

      </div>

      {/* Abnormal column */}
      <div className="md:col-span-3">
        <h3 className="text-lg font-semibold">Abnormal</h3>
        <ul className="mt-2 text-sm space-y-1">
          {abnormal.length === 0 && <li className="text-slate-500">None</li>}
          {abnormal.map((p, i) => (
            <li key={p.id} className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-400" />
              {i + 1}. {p.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

//vital component - improved layout and sizing
function Vital({ label, value, className }: { label: string; value: number | string; className?: string }) {
  return (
    <div
      className={`rounded-md bg-slate-50 ring-1 ring-black/5 p-4 text-center min-h-[90px] flex flex-col justify-center items-center ${className}`}
    >
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-semibold truncate">{value}</div>
    </div>
  );
}
