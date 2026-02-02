import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Activity, Zap, BarChart3, Play, Square } from 'lucide-react';

export default function VLLMDashboard() {
  const [latencyData, setLatencyData] = useState([]);
  const [throughputData, setThroughputData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [requestRate, setRequestRate] = useState(10);
  const [batchSize, setBatchSize] = useState(4);
  const [maxTokens, setMaxTokens] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);

  // Simulate real-time metrics
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();

      // Simulate latency (ms)
      setLatencyData((prev) => {
        const newData = [
          ...prev,
          {
            time: timestamp,
            p50: 50 + Math.random() * 30,
            p95: 120 + Math.random() * 40,
            p99: 180 + Math.random() * 50,
          },
        ];
        return newData.slice(-20);
      });

      // Simulate throughput (tokens/sec)
      setThroughputData((prev) => {
        const newData = [
          ...prev,
          {
            time: timestamp,
            tokens: isGenerating
              ? 800 + Math.random() * 400
              : 100 + Math.random() * 50,
          },
        ];
        return newData.slice(-20);
      });

      // Simulate requests/sec
      setRequestsData((prev) => {
        const newData = [
          ...prev,
          {
            time: timestamp,
            requests: isGenerating
              ? requestRate + Math.random() * 5
              : Math.random() * 2,
          },
        ];
        return newData.slice(-20);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGenerating, requestRate]);

  const applications = [
    {
      name: 'vllm-head',
      status: 'running',
      gpu: '0.5',
      memory: '8.2/16 GB',
      uptime: '2h 15m',
    },
    {
      name: 'vllm-worker-1',
      status: 'running',
      gpu: '0.5',
      memory: '7.8/16 GB',
      uptime: '2h 15m',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          vLLM Ray Cluster Dashboard
        </h1>
        <p className="text-slate-400">
          Run:AI GPU Partitioning • 2x 0.5 GPU • Model: facebook/opt-125m
        </p>
      </div>

      {/* 4-Quadrant Layout */}
      <div className="grid grid-cols-2 gap-6 min-h-[800px]">
        {/* TOP LEFT: Metrics Charts */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 min-h-[500px] max-h-[600px] overflow-y-auto">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Performance Metrics
          </h2>

          {/* Latency Chart */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-300 mb-2">
              Latency (ms)
            </h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} />
                <YAxis stroke="#9CA3AF" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="p50"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  name="P50"
                />
                <Line
                  type="monotone"
                  dataKey="p95"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  name="P95"
                />
                <Line
                  type="monotone"
                  dataKey="p99"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  name="P99"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Throughput Chart */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-300 mb-2">
              Throughput (tokens/sec)
            </h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} />
                <YAxis stroke="#9CA3AF" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Line
                  type="monotone"
                  dataKey="tokens"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  name="Tokens/sec"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Requests Chart */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2">
              Requests per Second
            </h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={requestsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} />
                <YAxis stroke="#9CA3AF" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={false}
                  name="Req/sec"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP RIGHT: Applications Status */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 min-h-[500px] max-h-[600px] overflow-y-auto">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Running Applications
          </h2>

          <div className="space-y-4">
            {applications.map((app, idx) => (
              <div
                key={idx}
                className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <h3 className="font-semibold text-white">{app.name}</h3>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-400">GPU Allocation</p>
                    <p className="text-white font-medium">{app.gpu} GPU</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Memory</p>
                    <p className="text-white font-medium">{app.memory}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Uptime</p>
                    <p className="text-white font-medium">{app.uptime}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Ray Status</p>
                    <p className="text-white font-medium">Connected</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Cluster Summary */}
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600 mt-6">
              <h3 className="font-semibold text-white mb-3">Cluster Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total GPUs:</span>
                  <span className="text-white font-medium">
                    1.0 GPU (2x 0.5)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tensor Parallel:</span>
                  <span className="text-white font-medium">Size 2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Model:</span>
                  <span className="text-white font-medium">opt-125m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Backend:</span>
                  <span className="text-white font-medium">Ray</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Orchestrator:</span>
                  <span className="text-white font-medium">Run:AI</span>
                </div>
              </div>
            </div>

            {/* GPU Utilization Bars */}
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
              <h3 className="font-semibold text-white mb-3">GPU Utilization</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>vllm-head</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: '78%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>vllm-worker-1</span>
                    <span>82%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: '82%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEFT: Traffic Generation Controls */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 min-h-[500px]">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            Traffic Generator
          </h2>

          <div className="space-y-6">
            {/* Request Rate Slider */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Request Rate: {requestRate} req/sec
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={requestRate}
                onChange={(e) => setRequestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>

            {/* Batch Size Slider */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Batch Size: {batchSize}
              </label>
              <input
                type="range"
                min="1"
                max="32"
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1</span>
                <span>16</span>
                <span>32</span>
              </div>
            </div>

            {/* Max Tokens Slider */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Max Tokens: {maxTokens}
              </label>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>10</span>
                <span>250</span>
                <span>500</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsGenerating(!isGenerating)}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  isGenerating
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Square className="w-4 h-4" />
                    Stop Traffic
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start Traffic
                  </>
                )}
              </button>
            </div>

            {/* Status Display */}
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
              <h3 className="font-semibold text-white mb-2">Current Status</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Traffic:</span>
                  <span
                    className={`font-medium ${
                      isGenerating ? 'text-green-400' : 'text-slate-400'
                    }`}
                  >
                    {isGenerating ? 'Active' : 'Idle'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Rate:</span>
                  <span className="text-white font-medium">
                    {requestRate} req/s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Batch Size:</span>
                  <span className="text-white font-medium">{batchSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Max Tokens:</span>
                  <span className="text-white font-medium">{maxTokens}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM RIGHT: Network Topology */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 min-h-[500px]">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Network Topology
          </h2>

          {/* Simple Network Diagram */}
          <div className="relative w-full h-96 bg-slate-900 rounded-lg border border-slate-600 flex items-center justify-center">
            {/* Head Node - Center (ACTIVE) */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Pulsing ring */}
                <div className="absolute -inset-3 bg-blue-500/30 rounded-full animate-ping"></div>

                {/* Node */}
                <div className="relative bg-blue-500 rounded-full w-20 h-20 flex items-center justify-center border-4 border-blue-300 shadow-lg shadow-blue-500/50">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Label */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-blue-600 px-3 py-1 rounded text-white text-xs font-bold">
                    vllm-head
                  </div>
                  <div className="text-xs text-center text-green-400 mt-1">
                    Serving
                  </div>
                </div>
              </div>
            </div>

            {/* Worker Node 1 - Top Left (ACTIVE) */}
            <div className="absolute left-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Pulsing ring */}
                <div className="absolute -inset-3 bg-green-500/30 rounded-full animate-ping"></div>

                {/* Node */}
                <div className="relative bg-green-500 rounded-full w-16 h-16 flex items-center justify-center border-4 border-green-300 shadow-lg shadow-green-500/50">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>

                {/* Label */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-green-600 px-3 py-1 rounded text-white text-xs font-bold">
                    worker-1
                  </div>
                  <div className="text-xs text-center text-green-400 mt-1">
                    Serving
                  </div>
                </div>
              </div>
            </div>

            {/* Idle Node 2 - Top Right */}
            <div className="absolute left-3/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="relative bg-slate-600 rounded-full w-12 h-12 flex items-center justify-center border-2 border-slate-500 opacity-50">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-xs text-center text-slate-500">
                    worker-2
                  </div>
                  <div className="text-xs text-center text-slate-600">Idle</div>
                </div>
              </div>
            </div>

            {/* Idle Node 3 - Bottom Left */}
            <div className="absolute left-1/4 top-3/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="relative bg-slate-600 rounded-full w-12 h-12 flex items-center justify-center border-2 border-slate-500 opacity-50">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-xs text-center text-slate-500">
                    worker-3
                  </div>
                  <div className="text-xs text-center text-slate-600">Idle</div>
                </div>
              </div>
            </div>

            {/* Idle Node 4 - Bottom Right */}
            <div className="absolute left-3/4 top-3/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="relative bg-slate-600 rounded-full w-12 h-12 flex items-center justify-center border-2 border-slate-500 opacity-50">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-xs text-center text-slate-500">
                    worker-4
                  </div>
                  <div className="text-xs text-center text-slate-600">Idle</div>
                </div>
              </div>
            </div>

            {/* Idle Node 5 - Top Center */}
            <div className="absolute left-1/2 top-[15%]">
              <div className="relative">
                <div className="relative bg-slate-600 rounded-full w-12 h-12 flex items-center justify-center border-2 border-slate-500 opacity-50">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-xs text-center text-slate-500">
                    worker-5
                  </div>
                  <div className="text-xs text-center text-slate-600">Idle</div>
                </div>
              </div>
            </div>

            {/* Idle Node 6 - Bottom Center */}
            <div className="absolute left-1/2 top-[85%]">
              <div className="relative">
                <div className="relative bg-slate-600 rounded-full w-12 h-12 flex items-center justify-center border-2 border-slate-500 opacity-50">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-xs text-center text-slate-500">
                    worker-6
                  </div>
                  <div className="text-xs text-center text-slate-600">Idle</div>
                </div>
              </div>
            </div>

            {/* Idle Node 7 - Left Center */}
            <div className="absolute left-[10%] top-1/2 transform -translate-y-1/2">
              <div className="relative">
                <div className="relative bg-slate-600 rounded-full w-12 h-12 flex items-center justify-center border-2 border-slate-500 opacity-50">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-xs text-center text-slate-500">
                    worker-7
                  </div>
                  <div className="text-xs text-center text-slate-600">Idle</div>
                </div>
              </div>
            </div>

            {/* Idle Node 8 - Right Center */}
            <div className="absolute left-[90%] top-1/2 transform -translate-y-1/2">
              <div className="relative">
                <div className="relative bg-slate-600 rounded-full w-12 h-12 flex items-center justify-center border-2 border-slate-500 opacity-50">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-xs text-center text-slate-500">
                    worker-8
                  </div>
                  <div className="text-xs text-center text-slate-600">Idle</div>
                </div>
              </div>
            </div>

            {/* Connection Lines - Only between active nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style={{ stopColor: '#10b981', stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: '#3b82f6', stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>

              {/* Line from worker-1 to head */}
              <line
                x1="25%"
                y1="25%"
                x2="50%"
                y2="50%"
                stroke="url(#grad1)"
                strokeWidth="4"
                strokeDasharray="10,5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="15"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-slate-800 p-3 rounded-lg border border-slate-600">
              <div className="text-xs text-slate-300 font-semibold mb-2">
                Legend
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-300">Head (Serving)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-300">Worker (Serving)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-600 rounded-full opacity-50"></div>
                  <span className="text-slate-400">Idle Node</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-green-500 to-blue-500"></div>
                  <span className="text-slate-300">Active Link</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="absolute top-4 right-4 bg-slate-800 p-3 rounded-lg border border-slate-600">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-bold">
                  Cluster Online
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between gap-3">
                  <span className="text-slate-400">Total Nodes:</span>
                  <span className="text-white font-medium">10</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-400">Serving:</span>
                  <span className="text-green-400 font-medium">2</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-400">Idle:</span>
                  <span className="text-slate-500 font-medium">8</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-400">Latency:</span>
                  <span className="text-green-400 font-medium">12ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
