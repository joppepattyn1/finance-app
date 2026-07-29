import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlySummaryChart({ data }) {
  return (
    <div className="chart-card">
      <h2 className="section-title">Maandoverzicht</h2>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#A1A1AA" />
          <YAxis stroke="#A1A1AA" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#16161A",
              borderRadius: "10px",
              border: "1px solid #2A2A2E",
            }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#4ADE80"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#F87171"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
