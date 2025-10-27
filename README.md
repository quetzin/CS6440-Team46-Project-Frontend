# ICU Wallboard — Patients Only (React + Tailwind)

- Patient Board (grid of patient status lights)
- Patient View (vitals + demographics)

## Quickstart
```bash
npm install
npm run dev
```

By default, `/api/*` requests are proxied to `http://localhost:8000` (configure in `vite.config.ts`). The app expects your backend to expose:
- `GET /api/patients`
- `GET /api/patients/:id`
```jsonc
// Patient shape (example)
{
  "id": "p-1",
  "name": "George Burdell",
  "age": 34,
  "sex": "Male",
  "weightLb": 220,
  "status": "critical", // ok | abnormal | critical
  "vitals": { "heartRate": 76, "bpSys": 120, "bpDia": 80, "spo2": 98, "respRate": 16, "temp": 37.0 }
}
```
