import { apiFetch, apiRequest } from "./api";

export function getProducts() {
  return apiFetch("/products");
}

export function getProductsCount() {
  return apiFetch("/products/count");
}

export function getLowStockProductsCount() {
  return apiFetch("/products/low-stock/count");
}

export function getOutOfStockProductsCount() {
  return apiFetch("/products/out-of-stock/count");
}

export function deleteProductById(id: string) {
  return apiRequest<void, void>(`/products/${id}`, "DELETE");
}

export function updateProductQuantityById(id: string, quantity: number) {
  return apiRequest<{ quantity: number }, void>(`/products/${id}/stock`, "PATCH", {
    quantity,
  });
}
