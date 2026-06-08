import { useEffect } from "react";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
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

import { queryKeys } from "./keys";
import { getOutOfStockProductsCount } from "./service";

import { useToast } from "@/components/Toast";

export default function OutOfStockProducts() {
  const {
    data: productsCount = { data: { count: 0 } },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.outOfStockProductsCount[0]],
    queryFn: getOutOfStockProductsCount,
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
            <Box className="product-info outofstock-container">
              <ErrorOutlineOutlinedIcon className="outofstock-icon" />
            </Box>
            <Stack>
              <Typography variant="body2">Out of stock Products</Typography>
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
