import { useState } from "react";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "./keys";
import { addProduct } from "./service";

import { useToast } from "@/components/Toast";

export default function CreateProduct() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [sku, setSKU] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [threshold, setThreshold] = useState<number>(0);

  function onClose() {
    setOpen(false);
    reset();
  }

  function reset() {
    setCategory("");
    setName("");
    setPrice(0);
    setSKU("");
    setQuantity(0);
    setThreshold(0);
  }

  async function crateProduct() {
    if (!name || !sku || !category) {
      showToast("Please enter all the required fields", "error");
      return;
    }

    try {
      await addProduct({ name, category, price, threshold, quantity, sku });
      showToast("Successfully created product", "success");

      queryClient.invalidateQueries({ queryKey: queryKeys.products });
      queryClient.invalidateQueries({ queryKey: queryKeys.productsCount });
      queryClient.invalidateQueries({
        queryKey: queryKeys.outOfStockProductsCount,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.lowStockProductsCount,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.lowStockProducts,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast(error.message || "Failed to delete product", "error");
      } else {
        console.error("Unknown error");
      }
    } finally {
      onClose();
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <AddBoxOutlinedIcon />
      </Button>

      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="create-product"
        aria-describedby="create-product-description"
        role="alertdialog"
      >
        <DialogTitle id="create-product">Create Product</DialogTitle>
        <DialogContent>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid size={6}>
              <FormControl fullWidth>
                <TextField
                  id="name"
                  aria-describedby="name-helper-text"
                  label="Name"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                  variant="outlined"
                />
                <FormHelperText id="name-helper-text">
                  Product Name
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <TextField
                  id="sku"
                  aria-describedby="sku-helper-text"
                  label="SKU"
                  onChange={(event) => setSKU(event.target.value)}
                  value={sku}
                  variant="outlined"
                />
                <FormHelperText id="sku-helper-text">
                  Ex: PROD-027
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <TextField
                  id="category"
                  aria-describedby="category-helper-text"
                  label="Category"
                  onChange={(event) => setCategory(event.target.value)}
                  value={category}
                  variant="outlined"
                />
                <FormHelperText id="category-helper-text">
                  Ex: Software
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <TextField
                  id="quantity"
                  aria-describedby="quantity-helper-text"
                  label="Stock"
                  onChange={(event) => setQuantity(Number(event.target.value))}
                  type="number"
                  value={quantity}
                  variant="outlined"
                />
                <FormHelperText id="quantity-helper-text">
                  Quantity of the product
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <TextField
                  id="threshold"
                  aria-describedby="threshold-helper-text"
                  label="Threshold"
                  onChange={(event) => setThreshold(Number(event.target.value))}
                  type="number"
                  value={threshold}
                  variant="outlined"
                />
                <FormHelperText id="threshold-helper-text">
                  Minimum threshold required
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <TextField
                  id="price"
                  aria-describedby="price-helper-text"
                  label="Price"
                  onChange={(event) => setPrice(Number(event.target.value))}
                  type="number"
                  value={price}
                  variant="outlined"
                />
                <FormHelperText id="price-helper-text">
                  Price in INR
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => crateProduct()}
            variant="contained"
          >
            Create
          </Button>
          <Button color="secondary" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
