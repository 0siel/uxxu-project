import { Injectable } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [
    {
      id: 1,
      name: "Alberto",
      lastName: "Acosta",
      phoneNumber: "4421234567",
    },
    {
      id: 2,
      name: "Brandon",
      lastName: "Becerra",
      phoneNumber: "4427654321",
    },
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1;
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    return this.employees.find((e) => e.id === id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const index = this.employees.findIndex((e) => e.id === id);
    this.employees[index] = { ...this.employees[index], ...updateEmployeeDto };
    return `Employee ${id} was updated`;
  }

  remove(id: number) {
    this.employees = this.employees.filter((e) => e.id !== id);
    return `Employee ${id} was removed.`;
  }
}
