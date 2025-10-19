import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeesRepository.save(createEmployeeDto);
    return employee;
  }

  findAll() {
    return this.employeesRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeesRepository.findOneBy({
      employeeId: id,
    });
    if (!employee) throw new NotFoundException(`Employee ${id} not found!`);
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeesRepository.preload({
      employeeId: id,
      ...updateEmployeeDto,
    });
    if (!employee) throw new NotFoundException();
    this.employeesRepository.save(employee);
    return employee;
  }

  remove(id: string) {
    return this.employeesRepository.delete({ employeeId: id });
  }
}
