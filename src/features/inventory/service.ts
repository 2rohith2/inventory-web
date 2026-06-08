import { apiRequest } from "./api";
import type { AddProductType } from "./enums";

const HTTP_METHOD = {
  get: "GET",
  patch: "PATCH",
  delete: "DELETE",
  post: "POST",
  put: "PUT",
} as const;

export function getProducts() {
  return apiRequest<void, void>('/products', HTTP_METHOD.get);
}

export function getProductsCount() {
  return apiRequest<void, void>('/products/count', HTTP_METHOD.get);
}

export function getLowStockProductsCount() {
  return apiRequest<void, void>('/products/low-stock/count', HTTP_METHOD.get);
}

export function getLowStockProducts() {
  return apiRequest<void, void>('/products/low-stock?limit=5', HTTP_METHOD.get);
}

export function getOutOfStockProductsCount() {
  return apiRequest<void, void>('/products/out-of-stock/count', HTTP_METHOD.get);
}

export function deleteProductById(id: string) {
  return apiRequest<void, void>(`/products/${id}`, HTTP_METHOD.delete);
}

export function updateProductQuantityById(id: string, quantity: number) {
  return apiRequest<{ quantity: number }, void>(`/products/${id}/stock`, HTTP_METHOD.patch, {
    quantity,
  });
}

export function addProduct(product: AddProductType) {
  return apiRequest<AddProductType, void>('/products', HTTP_METHOD.post, product);
}
