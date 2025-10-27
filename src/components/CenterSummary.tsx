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
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
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

      <div className="rounded-lg bg-white ring-1 ring-black/5 p-4">
        <div className="text-center text-sm text-slate-500">Patient</div>
        <div className="text-center font-semibold text-lg">
          {featured ? featured.name : "—"}
        </div>
        {featured ? (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            <Vital label="Heart Rate" value={featured.vitals.heartRate} />
            <Vital
              label="Blood Pressure"
              value={`${featured.vitals.bpSys}/${featured.vitals.bpDia}`}
            />
            <Vital label="Oxygen Saturation" value={featured.vitals.spo2} />
            <Vital label="Resp Rate" value={featured.vitals.respRate} />
            <Vital label="Temp" value={featured.vitals.temp} />
          </div>
        ) : (
          <div className="mt-4 text-center text-slate-500">No data</div>
        )}
      </div>

      <div>
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

function Vital({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md bg-slate-50 ring-1 ring-black/5 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}
