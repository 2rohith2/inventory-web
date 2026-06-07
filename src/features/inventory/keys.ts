export const queryKeys = {
  lowStockProducts: ["lowStockProducts"],
  lowStockProductsCount: ["lowStockProductsCount"],
  outOfStockProductsCount: ["outOfStockProductsCount"],
  products: ["products"],
  productsCount: ["productsCount"],
};

export type ProductType = {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  threshold: number;
  price: number;
};

export type AddProductType = {
  name: string;
  sku: string;
  category: string;
  quantity: number;
  threshold: number;
  price: number;
};