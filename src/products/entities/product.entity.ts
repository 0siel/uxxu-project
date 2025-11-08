import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Provider } from "src/providers/entities/provider.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  productId: string;
  @Column({ type: "text" })
  productName: string;
  @Column({ type: "float" })
  productPrice: number;
  @Column({ type: "int" })
  productCountSeal: number;
  @ManyToOne(() => Provider, (provider) => provider.products, {
    eager: true,
  })
  @JoinColumn({
    name: "providerId",
  })
  provider: Provider;
}
