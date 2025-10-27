# ICU Wallboard 

- Patient Board (grid of patient status lights)
- Patient View (vitals + demographics)

## Quickstart
```bash
npm install
npm run dev
```

- `GET /api/patients`
- `GET /api/patients/:id`

//Patient shape - ie.
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
