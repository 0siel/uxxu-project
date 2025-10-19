import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { v4 as uuid } from "uuid";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) {}

  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Cheetos Flaming Hot 70g",
      price: 19.0,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Takis Fuego 70g",
      price: 18.0,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Agua Ciel 1L",
      price: 12.0,
      countSeal: 0,
      provider: uuid(),
    },
  ];
  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.save(createProductDto);
    return product;
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ productId: id });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async findByProvider(providerId: string): Promise<Product[]> {
    const providerProducts = await this.productsRepository.findBy({
      provider: providerId,
    });
    return providerProducts;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productsRepository.preload({
      productId: id,
      ...updateProductDto,
    });
    if (!productToUpdate) throw new NotFoundException();
    this.productsRepository.save(productToUpdate);
    return productToUpdate;
  }

  remove(id: string) {
    return this.productsRepository.delete({
      productId: id,
    });
  }
}
