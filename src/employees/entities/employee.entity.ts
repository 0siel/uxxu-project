import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  employeeId: string;
  @Column({ type: "text" })
  name: string;
  @Column({ type: "text" })
  lastName: string;
  @Column({ type: "text" })
  phoneNumber: string;
  @Column({ type: "text" })
  email: string;
  @Column({
    type: "text",
    nullable: true
  })
  photoUrl: string;
}
