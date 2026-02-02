# react-lgzkuqld

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/JuanMaParraU/react-lgzkuqld)

# vLLM Ray Cluster Dashboard (React)

A lightweight React dashboard that simulates monitoring and traffic generation for a **vLLM + Ray GPU cluster**.  
The UI is designed for demos, PoCs, and architectural explanations rather than production monitoring.

It provides:

- Real-time simulated performance metrics
- Cluster / application status overview
- Traffic generation controls
- Visual network topology of head and worker nodes
- GPU utilization and resource summaries

---

## Purpose

This project is intended to:

- Demonstrate how an LLM serving dashboard could look
- Explain Ray + vLLM cluster concepts visually
- Simulate load and observe pseudo-metrics
- Serve as a starting point for integrating real metrics later

**Important:**  
Metrics are **simulated**, not connected to a real backend.

---

## Tech Stack

- **React 18**
- **Vite**
- **TailwindCSS (CDN)**
- **Recharts** – charts and time-series graphs
- **Lucide React** – icons

---

## Features

### 1. Performance Metrics
Real-time simulated charts:

- **Latency:** P50 / P95 / P99
- **Throughput:** tokens/sec
- **Requests/sec**

Data updates every second using `setInterval`.

---

### 2. Running Applications Panel
Displays:

- vLLM head and worker nodes
- GPU allocation
- Memory usage
- Uptime
- Ray connection status
- Cluster summary
- GPU utilization bars

All values are mock/demo data.

---

### 3. Traffic Generator
Interactive controls to simulate load:

- Request rate slider
- Batch size slider
- Max tokens slider
- Start / Stop traffic button

These controls influence the simulated metrics.

---

### 4. Network Topology Visualization
A visual cluster diagram showing:

- Head node (active)
- One active worker
- Multiple idle workers
- Animated links between serving nodes
- Cluster health summary

This is purely UI logic — not a real network graph.

---

## Project Structure (Typical)

```
project-root/
 ├─ index.html
 ├─ package.json
 ├─ src/
 │   ├─ main.jsx
 │   └─ VLLMDashboard.jsx
 └─ README.md
```

---

## Dependencies

```json
"dependencies": {
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "recharts": "2.5.0",
  "lucide-react": "0.263.1",
  "prop-types": "^15.6.0"
}
```

---

## Installation

### 1. Create Vite React App
```bash
npm create vite@latest vllm-dashboard -- --template react
cd vllm-dashboard
```

### 2. Install Dependencies
```bash
npm install recharts lucide-react prop-types
```

### 3. Replace Files
- Put the dashboard component in `src/VLLMDashboard.jsx`
- Import it in `main.jsx` or `App.jsx`

---

## Running the App

```bash
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## TailwindCSS

Tailwind is loaded via CDN in `index.html`:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

This keeps setup simple for demos but is **not recommended for production**.  
For production, install Tailwind properly via npm.

---

## How Metrics Work

Metrics are generated with:

- `setInterval` (1 second)
- Random values
- State arrays capped at 20 entries
- Traffic toggle influences throughput and request rate

No backend, sockets, or APIs are used.

---

## Customization Ideas

You can evolve this project by:

- Connecting to real vLLM `/metrics` endpoints
- Using WebSockets or SSE for live data
- Adding authentication
- Supporting multiple clusters
- Persisting traffic scenarios
- Replacing mock topology with real cluster data

---

## Limitations

- Not production-ready
- No backend integration
- Mock GPU usage
- Static topology
- No persistence
- No real scaling logic

---

## Intended Audience

- AI / ML engineers
- Platform engineers
- GPU infrastructure demos
- Technical presentations
- Hackathons and PoCs

---

## License

Free to use for demos, experimentation, and learning.
