import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId: string;
  @Column("text")
  userEmail: string;
  @Column("text")
  userPassword: string;
  @Column("simple-array", {
    default: "Employee",
  })
  userRoles: string[];
}
