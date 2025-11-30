import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Location } from "./entities/location.entity";
import { Repository } from "typeorm";
import { Manager } from "src/managers/entities/manager.entity";

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managersRepository: Repository<Manager>
  ) {}

  create(createLocationDto: CreateLocationDto) {
    const product = this.locationsRepository.save(createLocationDto);
    return product;
  }

  findAll() {
    return this.locationsRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationsRepository.findOneBy({
      locationId: id,
    });

    if (!location) throw new NotFoundException(`Location not found`);

    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    await this.managersRepository
      .createQueryBuilder("manager")
      .update(Manager)
      .set({ location: () => "NULL" })
      .where("location = :locationId", { locationId: id })
      .execute();

    const location = await this.locationsRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });

    if (!location) throw new NotFoundException(`Location not found`);

    const savedLocation = await this.locationsRepository.save(location);

    // If a manager id or manager object was provided, attempt to preload and save the manager relation
    if (updateLocationDto.manager) {
      const managerIdValue =
        typeof updateLocationDto.manager === "string"
          ? updateLocationDto.manager
          : (updateLocationDto.manager as Manager).managerId;

      const updatedManager = await this.managersRepository.preload({
        managerId: managerIdValue,
        location: savedLocation,
      });

      if (updatedManager) {
        await this.managersRepository.save(updatedManager);
      }
    }

    return savedLocation;
  }

  remove(id: number) {
    return this.locationsRepository.delete({ locationId: id });
  }
}
