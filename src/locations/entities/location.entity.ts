import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("increment")
  locationId: string;
  @Column("text")
  locationName: string;
  @Column("text")
  locationAdress: string;
  @Column("float", { array: true })
  locationLatLng: number[];
}
