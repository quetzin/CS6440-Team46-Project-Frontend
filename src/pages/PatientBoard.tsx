import React, { useEffect, useMemo, useState } from "react";
import { listPatients, listPatientsWithAuthCheck } from "../api/patients";
import type { Patient } from "../types";
import StatusLight from "../components/StatusLight";
import CenterSummary from "../components/CenterSummary";
import PatientModal from "../components/PatientModal";


export default function PatientBoard() {
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  //selection state
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null); // for modal

  useEffect(() => {
    listPatientsWithAuthCheck().then(setPatients).catch((e) => setError(e.message));
  }, []);

  const { critical, abnormal, normal, byId } = useMemo(() => {
    const all = patients ?? [];
    return {
      critical: all.filter((p) => p.status === "critical"),
      abnormal: all.filter((p) => p.status === "abnormal"),
      normal: all.filter((p) => p.status === "normal"),
      byId: Object.fromEntries(all.map((p) => [p.id, p] as const)) as Record<
        string,
        Patient
      >,
    };
  }, [patients]);

  // featured patient priority: hover > first critical > first patient
  const featured: Patient | null = useMemo(() => {
    if (!patients || patients.length === 0) return null;
    if (hoverId && byId[hoverId]) return byId[hoverId];
    if (critical[0]) return critical[0];
    return patients[0];
  }, [patients, byId, hoverId, critical]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!patients) return <div>Retrieving all patients... this can take a while...</div>;

  //ring coordinates around a 5x5
  type Pos = { r: number; c: number };
  const ring: Pos[] = [
    // top
    { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 }, { r: 1, c: 5 },
    // right
    { r: 2, c: 5 }, { r: 3, c: 5 }, { r: 4, c: 5 },
    // bottom
    { r: 5, c: 5 }, { r: 5, c: 4 }, { r: 5, c: 3 }, { r: 5, c: 2 }, { r: 5, c: 1 },
    // left
    { r: 4, c: 1 }, { r: 3, c: 1 }, { r: 2, c: 1 },
  ];

  const ringPatients: (Patient | null)[] = Array.from({ length: ring.length }).map(
    (_, i) => patients[i] ?? null
  );

  return (
    <>
      <div className="bg-slate-900 rounded-2xl p-4 md:p-6 shadow-soft ring-1 ring-black/10">
        <div className="relative mx-auto aspect-[5/5] grid grid-cols-5 grid-rows-5 gap-3 md:gap-4 max-w-5xl">
          {/* outer ring */}
          {ringPatients.map((p, idx) => {
            const pos = ring[idx];
            const style = {
              gridRowStart: pos.r,
              gridColumnStart: pos.c,
            } as React.CSSProperties;

            return (
              <div key={idx} style={style} className="flex items-center justify-center">
                <button
                  disabled={!p}
                  onClick={() => p && setSelectedId(p.id)} // open modal
                  onMouseEnter={() => p && setHoverId(p.id)} // update center summary on hover
                  onMouseLeave={() => setHoverId(null)}
                  className={`group w-full h-full min-h-16 min-w-16 rounded-xl2 bg-slate-800 ring-1 ring-white/10 hover:ring-white/20 transition flex items-center justify-center p-3 ${p ? "cursor-pointer" : "opacity-40"}`}
                >
                  {p ? (
                    <div className="flex flex-col items-center gap-2">
                      <StatusLight status={p.status} />
                      <div className="text-white text-xs opacity-90">{p.name}</div>
                    </div>
                  ) : (
                    <div className="text-slate-400 text-xs">Empty</div>
                  )}
                </button>
              </div>
            );
          })}

          {/* center 3x3 summary */}
          <div className="col-start-2 col-end-5 row-start-2 row-end-5 rounded-xl2 bg-slate-100 p-4 md:p-6 ring-1 ring-black/10 shadow-soft">
            <CenterSummary critical={critical} abnormal={abnormal} featured={featured} />
          </div>
        </div>
      </div>

      {/* modal */}
      {selectedId && byId[selectedId] && (
        <PatientModal patient={byId[selectedId]} onClose={() => setSelectedId(null)} />
      )}
    </>
  );
}
