import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Provider } from "src/providers/entities/provider.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  productId: string;
  @Column({ type: "text" })
  productName: string;
  @Column({ type: "float" })
  price: number;
  @Column({ type: "int" })
  countSeal: number;
  @ManyToOne(() => Provider, (provider) => provider.products, {
    eager: true,
  })
  provider: Provider;
}
