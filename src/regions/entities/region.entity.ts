import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Region {
  @PrimaryGeneratedColumn("increment")
  regionId: string;
  @Column({
    type: "text",
    unique: true,
  })
  regionName: string;
  @Column("float", {array: true })
  regionStates: string[];
}
