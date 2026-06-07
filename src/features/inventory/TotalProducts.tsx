import { useEffect } from "react";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
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

import { getProductsCount } from "./service";

import { useToast } from "@/components/Toast";

export default function TotalProducts() {
  const {
    data: productsCount,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["productsCount"],
    queryFn: getProductsCount,
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
            <Box className="product-info success-container">
              <Inventory2OutlinedIcon className="success-icon" />
            </Box>
            <Stack>
              <Typography variant="body2">Total Products</Typography>
              <Typography variant="h4">
                <b>{productsCount.data.count}</b>
              </Typography>
            </Stack>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
