export type Status = 'normal' | 'abnormal' | 'critical';

export type Vitals = {
  heartRate: number;
  bpSys: number;
  bpDia: number;
  spo2: number;
  respRate: number;
  temp: number;
}

export type TimeSeriesPoint = {
  time: string; // ISO timestamp
  value: number;
}

export type TimeSeries = {
  [key: string]: TimeSeriesPoint[];
}

export type LatestLabs = {
  mixedVenousO2?: number;
  lactate?: number;
  pH?: number;
  pO2?: number;
  pCO2?: number;
  bnp?: number;
  [key: string]: number | undefined;
}

export type Patient = {
  id: string;
  name: string;
  age: number;
  sex: 'Male' | 'Female' | 'Other';
  weightLb: number;
  status: Status;
  vitals: Vitals;
  timeSeries?: TimeSeries;
  latestLabs?: LatestLabs;
}