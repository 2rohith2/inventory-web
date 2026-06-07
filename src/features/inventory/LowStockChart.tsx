import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chart = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function LowStockChart() {
  return (
    <>
      <BarChart
        responsive
        data={chart}
        layout="vertical"
        margin={{ top: 40 }}
        style={{
          width: "100%",
          maxWidth: "600px",
          aspectRatio: 1.5,
        }}
      >
        <text
          x="50%"
          y={20}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: 16, fontWeight: 600 }}
        >
          Top 5 Lowest Stock Products
        </text>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="category" dataKey="name" />
        <XAxis type="number" dataKey="amt" />
        <Bar dataKey="amt" fill="#e0633a" barSize={20} />
        <Tooltip />
        <Legend />
      </BarChart>

      <LineChart
        responsive
        data={chart}
        style={{
          maxWidth: "600px",
          height: "100%",
          aspectRatio: 1.8,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="var(--color-text-3)" />
        <YAxis stroke="var(--color-text-3)" />
        <Tooltip
          cursor={{
            stroke: "var(--color-border-2)",
          }}
          contentStyle={{
            backgroundColor: "var(--color-surface-raised)",
            borderColor: "var(--color-border-2)",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="amt"
          dot={{
            fill: "var(--color-surface-base)",
          }}
          activeDot={{ r: 8, stroke: "var(--color-surface-base)" }}
        />
      </LineChart>
    </>
  );
}
