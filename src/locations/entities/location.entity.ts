import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("increment")
  locationId: number;
  @Column("text")
  locationName: string;
  @Column("text")
  locationAddress: string;
  @Column("double precision", { array: true })
  locationLatLng: number[];

  @OneToOne(() => Manager, { eager: true })
  @JoinColumn({
    name: "managerId",
  })
  manager: Manager;

  @ManyToOne(() => Region, (region) => region.locations)
  @JoinColumn({
    name: "regionId",
  })
  region: Region;

  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[];
}
