"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

type AnalyticsStats = {
  totalVisits: number;
  visitsOverTime: { date: string; value: number }[];
  byDevice: { name: string; value: number }[];
  byCountry: { name: string; value: number }[];
  byPage: { name: string; value: number }[];
};

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("7d");

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/stats?range=${range}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [range]);

  if (loading && !stats) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        Loading analytics...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load analytics data.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Traffic Analytics
        </h2>

        <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {["24h", "7d", "30d", "all"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                range === r
                  ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}

          <button
            onClick={fetchStats}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <ArrowPathIcon className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Visits" value={stats.totalVisits} />
        <Card title="Top Country" value={stats.byCountry?.[0]?.name ?? "-"} />
        <Card
          title="Top Device"
          value={stats.byDevice?.[0]?.name ?? "-"}
          capitalize
        />
        <Card
          title="Top Page"
          value={stats.byPage?.[0]?.name ?? "-"}
          truncate
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <ChartCard title="Visits Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.visitsOverTime ?? []}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart */}
        <ChartCard title="Device Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.byDevice ?? []}
                dataKey="value"
                innerRadius={60}
                outerRadius={80}
              >
                {(stats.byDevice ?? []).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* Small reusable components */

function Card({
  title,
  value,
  capitalize,
  truncate,
}: {
  title: string;
  value: string | number;
  capitalize?: boolean;
  truncate?: boolean;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p
        className={`mt-1 font-bold text-gray-900 dark:text-white ${
          capitalize ? "capitalize" : ""
        } ${truncate ? "truncate text-base" : "text-2xl"}`}
      >
        {value}
      </p>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border h-80">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {children}
    </div>
  );
}
