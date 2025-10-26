import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { Repository } from "typeorm";
import { Manager } from "./entities/manager.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Region } from "src/regions/entities/region.entity";

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managersRepository: Repository<Manager>
  ) {}
  create(createManagerDto: CreateManagerDto) {
    return this.managersRepository.save(createManagerDto);
  }

  findAll() {
    return this.managersRepository.find();
  }

  findOne(id: string) {
    const manager = this.managersRepository.findOneBy({
      managerId: id,
    });
    if (!manager) throw new NotFoundException(`Manager ${id} not found`);
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managersRepository.preload({
      managerId: id,
      ...updateManagerDto,
    });
    if (!managerToUpdate) throw new NotFoundException();
    return this.managersRepository.save(managerToUpdate);
  }

  remove(id: string) {
    return this.managersRepository.delete({
      managerId: id,
    });
  }
}
