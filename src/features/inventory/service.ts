import { apiRequest } from "./api";
import type { AddProductType } from "./keys";

export function getProducts() {
  return apiRequest<void, void>('/products', "GET");
}

export function getProductsCount() {
  return apiRequest<void, void>('/products/count', "GET");
}

export function getLowStockProductsCount() {
  return apiRequest<void, void>('/products/low-stock/count', "GET");
}

export function getLowStockProducts() {
  return apiRequest<void, void>('/products/low-stock?limit=5', "GET");
}

export function getOutOfStockProductsCount() {
  return apiRequest<void, void>('/products/out-of-stock/count', "GET");
}

export function deleteProductById(id: string) {
  return apiRequest<void, void>(`/products/${id}`, "DELETE");
}

export function updateProductQuantityById(id: string, quantity: number) {
  return apiRequest<{ quantity: number }, void>(`/products/${id}/stock`, "PATCH", {
    quantity,
  });
}

export function addProduct(product: AddProductType) {
  return apiRequest<AddProductType, void>('/products', "POST", product);
}
