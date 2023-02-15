import { ProductProps } from "../entities/Product";
import { IProductRepository } from "./ports/IProductRepository";

export class InMemoryProductRepo implements IProductRepository {
  constructor(private list: ProductProps[]) {}

  async create(product: ProductProps): Promise<void> {
    this.list.push(product);
  }

  async findProductByName(name: string): Promise<any | boolean> {
    const productAlreadyExists = this.list.find(
      (product) => product.name === name
    );

    return productAlreadyExists || false;
  }

  async findProductById(id: string): Promise<any> {
    const productAlreadyExists = this.list.find((product) => product.id === id);
    return productAlreadyExists || false;
  }

  async getAllProducts(): Promise<ProductProps[]> {
    const allProducts = this.list;
    return allProducts;
  }

  async deleteById(id: string): Promise<void> {
    const listWithoutProduct = this.list.filter((product) => product.id !== id);
    this.list = listWithoutProduct;
  }

  async updateProduct(
    id: string,
    name: string,
    price?: number,
    description?: string
  ): Promise<any> {
    const product: ProductProps = await this.findProductById(id);
    const updateProduct = {
      ...product,
      name: name || product.name,
      price: price || product.price,
      description: description || product.description,
    };
    const updateList = this.list.map((item) => {
      if (item === product) {
        item = updateProduct;
      }
      return item;
    });
    return updateProduct;
  }
}
