/* eslint-disable react-hooks/set-state-in-effect */
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { SortDirection } from "@mui/material/TableCell";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "./queryKeys";
import {
  deleteProductById,
  getProducts,
  updateProductQuantityById,
} from "./service";

import { useToast } from "@/components/Toast";

type Order = "asc" | "desc";
type OrderBy = "name" | "sku" | "category" | "quantity" | "threshold" | "price";

type ProductType = {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  threshold: number;
  price: number;
};

export default function ProductsTable() {
  const [order, setOrder] = useState<SortDirection>("asc");
  const [orderBy, setOrderBy] = useState<OrderBy>("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [updateProductId, setUpdateProductId] = useState<string | null>(null);
  const [updatedQuantity, setUpdatedQuantity] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isQuantityUpdatingOrDeleting, setIsQuantityUpdatingOrDeleting] =
    useState<boolean>(false);

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const {
    data: products = { data: [] },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const queryClient = useQueryClient();
  const { showToast } = useToast();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.data.length) : 0;

  const allProducts: ProductType[] = products.data;

  const filteredData = useMemo(() => {
    const data = allProducts.filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase()),
    );

    return data
      .filter((a) => selectedCategories.includes(a.category))
      .sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return order === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      });
  }, [search, order, orderBy, selectedCategories, products]);

  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === "asc";
    const newOrder: Order = isAsc ? "desc" : "asc";

    setOrder(newOrder);
    setOrderBy(property);
  };

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const menuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuOptionClick = (selectedCategory: string, toAdd: boolean) => {
    if (toAdd) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    } else {
      const newCat = selectedCategories.filter(
        (cat) => cat !== selectedCategory,
      );
      setSelectedCategories(newCat);
    }
  };

  async function updateQuantity() {
    if (!updateProductId) return;

    try {
      setIsQuantityUpdatingOrDeleting(true);
      await updateProductQuantityById(updateProductId, updatedQuantity);
      showToast("Successfully updated product quantity", "success");

      queryClient.invalidateQueries({ queryKey: queryKeys.products });
      queryClient.invalidateQueries({
        queryKey: queryKeys.outOfStockProductsCount,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.lowStockProductsCount,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast(error.message || "Failed to delete product", "error");
      } else {
        console.error("Unknown error");
      }
    } finally {
      setIsQuantityUpdatingOrDeleting(false);
      setUpdateProductId(null);
      setUpdatedQuantity(0);
    }
  }

  async function deleteProduct() {
    if (!deleteProductId) return;

    try {
      setIsQuantityUpdatingOrDeleting(true);
      await deleteProductById(deleteProductId);
      showToast("Successfully deleted product", "success");

      queryClient.invalidateQueries({ queryKey: queryKeys.products });
      queryClient.invalidateQueries({ queryKey: queryKeys.productsCount });
      queryClient.invalidateQueries({
        queryKey: queryKeys.outOfStockProductsCount,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.lowStockProductsCount,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast(error.message || "Failed to delete product", "error");
      } else {
        console.error("Unknown error");
      }
    } finally {
      setIsQuantityUpdatingOrDeleting(false);
      setDeleteProductId(null);
      setShowDialog(false);
    }
  }

  useEffect(() => {
    if (isError) {
      showToast(
        `Error when trying to fetch Low Stock Products - ${error?.message}`,
        "error",
      );
    }
  }, [isError, error, showToast]);

  useEffect(() => {
    setPage(0);
  }, [search]);

  useEffect(() => {
    setSelectedCategories([...new Set(allProducts.map((p) => p.category))]);
  }, [products]);

  useEffect(() => {
    if (deleteProductId) {
      setShowDialog(true);
    }
  }, [deleteProductId]);

  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Table
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <TextField
            label="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {search && (
                      <InputAdornment position="end">
                        <CancelOutlinedIcon
                          fontSize="small"
                          onClick={() => setSearch("")}
                          sx={{ cursor: "pointer" }}
                        />
                      </InputAdornment>
                    )}
                  </>
                ),
              },
            }}
            variant="standard"
          />

          <IconButton onClick={menuClick}>
            <Badge
              badgeContent={selectedCategories.length}
              color="primary"
              component="div"
            >
              <Box>
                <FilterListIcon />
              </Box>
            </Badge>
          </IconButton>
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: {
              overflow: "visible",
              mt: 1.5,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20, // adjust position
                width: 12,
                height: 12,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat}>
            <Checkbox
              checked={selectedCategories.includes(cat)}
              onClick={() =>
                menuOptionClick(cat, !selectedCategories.includes(cat))
              }
            />
            <ListItemText
              primary={cat}
              onClick={() =>
                menuOptionClick(cat, !selectedCategories.includes(cat))
              }
            />
          </MenuItem>
        ))}
      </Menu>

      {!isLoading && !isError && (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="Inventory Table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={
                        orderBy === "name" && order === "asc" ? "asc" : "desc"
                      }
                      onClick={() => handleRequestSort("name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "sku"}
                      direction={
                        orderBy === "sku" && order === "asc" ? "asc" : "desc"
                      }
                      onClick={() => handleRequestSort("sku")}
                    >
                      SKU
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "category"}
                      direction={
                        orderBy === "category" && order === "asc"
                          ? "asc"
                          : "desc"
                      }
                      onClick={() => handleRequestSort("category")}
                    >
                      Category
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "quantity"}
                      direction={
                        orderBy === "quantity" && order === "asc"
                          ? "asc"
                          : "desc"
                      }
                      onClick={() => handleRequestSort("quantity")}
                    >
                      Stock
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "threshold"}
                      direction={
                        orderBy === "threshold" && order === "asc"
                          ? "asc"
                          : "desc"
                      }
                      onClick={() => handleRequestSort("threshold")}
                    >
                      Threshold
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "price"}
                      direction={
                        orderBy === "price" && order === "asc" ? "asc" : "desc"
                      }
                      onClick={() => handleRequestSort("price")}
                    >
                      Price (INR)
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : filteredData
                ).map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.sku}</TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">
                      {isQuantityUpdatingOrDeleting &&
                        updateProductId === row.id && (
                          <CircularProgress
                            size={23}
                            aria-label="Updating Quantity"
                          />
                        )}
                      {!isQuantityUpdatingOrDeleting &&
                        updateProductId === row.id && (
                          <TextField
                            size="small"
                            type="number"
                            autoFocus
                            value={updatedQuantity}
                            sx={{ width: 100 }}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>,
                            ) => setUpdatedQuantity(Number(event.target.value))}
                            onBlur={() => updateQuantity()}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                updateQuantity();
                              }

                              if (event.key === "Escape") {
                                setUpdateProductId(null);
                              }
                            }}
                          />
                        )}
                      {updateProductId !== row.id && (
                        <IconButton
                          disabled={isQuantityUpdatingOrDeleting}
                          sx={{
                            "&.Mui-disabled": {
                              cursor: "not-allowed",
                              pointerEvents: "auto",
                            },
                          }}
                          onClick={() => {
                            setUpdateProductId(row.id);
                            setUpdatedQuantity(row.quantity);
                          }}
                        >
                          {row.quantity}
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell align="right">{row.threshold}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      {isQuantityUpdatingOrDeleting &&
                      deleteProductId === row.id ? (
                        <CircularProgress
                          size={23}
                          aria-label="Updating Quantity"
                        />
                      ) : (
                        <IconButton
                          disabled={isQuantityUpdatingOrDeleting}
                          sx={{
                            "&.Mui-disabled": {
                              cursor: "not-allowed",
                              pointerEvents: "auto",
                            },
                          }}
                          onClick={() => setDeleteProductId(row.id)}
                        >
                          <DeleteOutlinedIcon color="error" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 43 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      {isLoading && (
        <>
          <Skeleton variant="rounded" animation="wave" height={100} />
          <br />
          <Skeleton variant="rounded" animation="wave" height={100} />
        </>
      )}

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="delete-product"
        aria-describedby="delete-product-description"
        role="alertdialog"
      >
        <DialogTitle id="delete-product">Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-product-description">
            Are you sure do you want to delete the product ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteProduct()}>Agree</Button>
          <Button
            onClick={() => {
              setShowDialog(false);
              setDeleteProductId(null);
            }}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
