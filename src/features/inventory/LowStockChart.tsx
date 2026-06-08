import { useEffect } from "react";

import { Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { queryKeys } from "./keys";
import { getLowStockProducts } from "./service";

import { useToast } from "@/components/Toast";

export default function LowStockChart() {
  const {
    data: products = { data: [] },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.lowStockProducts[0]],
    queryFn: getLowStockProducts,
  });

  const { showToast } = useToast();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const chartColors = {
    axis: isDark ? "#94a3b8" : "#64748b",
    grid: isDark ? "#7889a1" : "#253a55",
    tooltipBg: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#f1f5f9" : "#1e1e1e",
  };

  useEffect(() => {
    if (isError) {
      showToast(
        `Error when trying to fetch Low Stock Products - ${error?.message}`,
        "error",
      );
    }
  }, [isError, error, showToast]);

  return (
    <>
      {isLoading && (
        <>
          <Skeleton variant="rounded" animation="wave" height={100} />
          <br />
          <Skeleton variant="rounded" animation="wave" height={100} />
        </>
      )}

      {!isLoading && !isError && (
        <BarChart
          responsive
          data={products?.data ?? []}
          layout="vertical"
          margin={{ top: 40 }}
          style={{
            width: "100%",
            maxWidth: "600px",
            maxHeight: "350px",
            aspectRatio: 1.5,
          }}
        >
          <text
            x="50%"
            y={20}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 16, fontWeight: 700, fill: chartColors.axis }}
          >
            Top 5 Lowest Stock Products
          </text>
          <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
          <XAxis
            type="number"
            dataKey="quantity"
            tick={{ fill: chartColors.axis }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={200}
            tick={{ fill: chartColors.axis }}
          />
          <Bar dataKey="quantity" name="Quantity" fill="#e0633a" barSize={20} />
          <Tooltip
            contentStyle={{
              backgroundColor: chartColors.tooltipBg,
              color: chartColors.text,
            }}
          />
          <Legend />
        </BarChart>
      )}
    </>
  );
}
