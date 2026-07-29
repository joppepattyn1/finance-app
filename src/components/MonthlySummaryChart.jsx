import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import "../styles/overview.css";

export default function MonthlySummaryChart({ data }) {
  return (
    <div className="chart-card">
      <h2 className="chart-title">Maandoverzicht</h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ececf2" strokeDasharray="4 4" />

          <XAxis
            dataKey="day"
            tick={{ fill: "#7a7a85", fontSize: 12 }}
            stroke="#ececf2"
          />

          <YAxis
            tick={{ fill: "#7a7a85", fontSize: 12 }}
            stroke="#ececf2"
          />

          <Tooltip
            contentStyle={{
              background: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #ececf2",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.06)"
            }}
          />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#4fb782"
            strokeWidth={3}
            dot={false}
            animationDuration={800}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#e88a8a"
            strokeWidth={3}
            dot={false}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
