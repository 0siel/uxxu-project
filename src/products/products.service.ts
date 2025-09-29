import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {

  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Cheetos Flaming Hot 70g",
      price: 19.0,
      countSeal: 3,
      provider: uuid() 
    },
    {
      productId: uuid(),
      productName: "Takis Fuego 70g",
      price: 18.0,
      countSeal: 3,
      provider: uuid() 
    },
    {
      productId: uuid(),
      productName: "Agua Ciel 1L",
      price: 12.0,
      countSeal: 0,
      provider: uuid() 
    }
  ]
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid()
    this.products.push(createProductDto)
    return createProductDto;
  }

  findAll() {
    return this.products
  }

  findOne(id: string) {
    const product = this.products.find((p) => p.productId === id)
    if(!product) throw new NotFoundException();
    return product;
  }

  findByProvider(provider: string){
    const providerProducts = this.products.filter(p => p.provider === provider);
    return providerProducts;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex((p) => p.productId === id);
    if (index === -1) throw new NotFoundException();
    const updatedProduct = { ...this.products[index], ... updateProductDto};
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  remove(id: string) {
    const index = this.products.findIndex((p) => p.productId === id);
    if (index === -1) throw new NotFoundException();
    this.products.splice(index, 1)
    return this.products
  }
}
