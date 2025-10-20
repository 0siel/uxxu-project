import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Product } from "src/products/entities/product.entity";

@Entity()
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  providerId: string;
  @Column('text')
  providerName: string;
  @Column('text')
  providerEmail: string;
  @Column('text')
  providerPhoneNumber: string;
  @OneToMany(() => Product, (product) => product.provider)
  products: Product[]
 }
