import { type Dispatch, type SetStateAction } from "react";

import { Box, Grid, Stack } from "@mui/material";
import "./App.css";

import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";
import LowStockChart from "./features/inventory/LowStockChart";
import LowStockProducts from "./features/inventory/LowStockProducts";
import OutOfStockProducts from "./features/inventory/OutOfStockProducts";
import ProductsTable from "./features/inventory/ProductsTable";
import TotalProducts from "./features/inventory/TotalProducts";

type Props = {
  mode: "light" | "dark";
  setMode: Dispatch<SetStateAction<"light" | "dark">>;
};

export default function App({ mode, setMode }: Props) {
  return (
    <>
      <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
        {/* Sidebar Section */}
        <Grid size={2} className="sidebar">
          <Sidebar />
        </Grid>
        {/* Content Section */}
        <Grid
          size={10}
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <NavigationBar mode={mode} setMode={setMode} />

          <Stack
            spacing={2}
            sx={{
              flex: 1,
              overflowY: "scroll",
              p: 2,
            }}
          >
            <Stack className="section" spacing={2}>
              <Grid container size={12} spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TotalProducts />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <LowStockProducts />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <OutOfStockProducts />
                </Grid>
              </Grid>

              <Box>
                <ProductsTable />
              </Box>
            </Stack>

            <LowStockChart />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
