import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { v4 as uuid } from "uuid";

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [
    {
      id: uuid(), 
      name: "Alberto",
      lastName: "Acosta",
      phoneNumber: "4421234567",
    },
    {
      id: uuid(),
      name: "Brandon",
      lastName: "Becerra",
      phoneNumber: "4427654321",
    },
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.find((e) => e.id === id);
    if (!employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = this.findOne(id); // This validates existence and throws if not found
    const index = this.employees.findIndex((e) => e.id === id);
    const updatedEmployee = { ...employee, ...updateEmployeeDto };
    this.employees[index] = updatedEmployee;
    return updatedEmployee;
  }

  remove(id: string) {
    const index = this.employees.findIndex((e) => e.id === id);
    if (index === -1) throw new NotFoundException();
    const removedEmployee = this.employees[index];
    this.employees.splice(index, 1);
    return removedEmployee;
  }
}
