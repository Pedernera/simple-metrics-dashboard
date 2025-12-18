import { products } from "../data/products";
import { sleep } from "./sleep";
import type { Product } from "../types/product";

export async function getProducts(): Promise<Product[]> {
  await sleep(600);
  return products;
}
