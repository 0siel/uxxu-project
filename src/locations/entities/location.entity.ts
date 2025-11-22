import { ApiProperty } from "@nestjs/swagger";
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

  @ApiProperty({
    default: "UxxU Juriquilla",
  })
  @Column("text")
  locationName: string;

  @ApiProperty({
    default: "Blvd. Universitarios 3001, Juriquilla, Querétaro, Qro., México",
  })
  @Column("text")
  locationAddress: string;

  @ApiProperty({
    default: [20.705780429282996, -100.44267442529818],
  })
  @Column("double precision", { array: true })
  locationLatLng: number[];

  @ApiProperty({
    default: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
  })
  @OneToOne(() => Manager, { eager: true })
  @JoinColumn({
    name: "managerId",
  })
  manager: Manager | string;

  @ManyToOne(() => Region, (region) => region.locations)
  @JoinColumn({
    name: "regionId",
  })
  region: Region;

  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[];
}
