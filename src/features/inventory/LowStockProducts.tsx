import { useEffect } from "react";

import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "./enums";
import { getLowStockProductsCount } from "./service";

import { useToast } from "@/components/Toast";

export default function LowStockProducts() {
  const {
    data: productsCount = { data: { count: 0 } },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.lowStockProductsCount[0]],
    queryFn: getLowStockProductsCount,
  });

  const { showToast } = useToast();

  useEffect(() => {
    if (isError) {
      showToast(
        `Error when trying to fetch Low Stock Products - ${error?.message}`,
        "error",
      );
    }
  }, [isError, error, showToast]);

  return (
    <Card elevation={4}>
      <CardContent>
        {isLoading && <Skeleton variant="rounded" height={60} />}
        {!isLoading && !isError && (
          <Grid container spacing={3}>
            <Box className="product-info lowstock-container">
              <PriorityHighOutlinedIcon className="lowstock-icon" />
            </Box>
            <Stack>
              <Typography variant="body2">Low stock Products</Typography>
              <Typography variant="h4">
                <b>{productsCount?.data?.count}</b>
              </Typography>
            </Stack>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
