import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Location } from "./entities/location.entity";
import { Repository } from "typeorm";

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>
  ) {}

  create(createLocationDto: CreateLocationDto) {
    const product = this.locationsRepository.save(createLocationDto);
    return product;
  }

  findAll() {
    return this.locationsRepository.find();
  }

  findOne(id: number) {
    const location = this.locationsRepository.findOneBy({ locationId: id });

    if (!location) throw new NotFoundException(`Location not found`);

    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const locationToUpdate = await this.locationsRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });
    if (!locationToUpdate) throw new NotFoundException(`Location not found`);
    return this.locationsRepository.save(locationToUpdate);
  }

  remove(id: number) {
    return this.locationsRepository.delete({ locationId: id });
  }
}
