export type Status = 'normal' | 'abnormal' | 'critical';
export type Vitals = {
  heartRate: number;
  bpSys: number;
  bpDia: number;
  spo2: number;
  respRate: number;
  temp: number;
}
export type Patient = {
  id: string;
  name: string;
  age: number;
  sex: 'Male' | 'Female' | 'Other';
  weightLb: number;
  status: Status;
  vitals: Vitals;
}