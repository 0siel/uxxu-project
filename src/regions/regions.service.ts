import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Region } from "./entities/region.entity";
import { Repository } from "typeorm";

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionsRepository: Repository<Region>
  ) {}
  create(createRegionDto: CreateRegionDto) {
    return this.regionsRepository.save(createRegionDto);
  }

  findAll() {
    return this.regionsRepository.find();
  }

  findOne(id: string) {
    const region = this.regionsRepository.findOneBy({
      regionId: id,
    });
    if (!region) throw new NotFoundException(`Region ${id} not found`);
    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const regionToUpdate = await this.regionsRepository.preload({
      regionId: id,
      ...updateRegionDto,
    });
    if (!regionToUpdate) throw new NotFoundException(`Region ${id} not found`);
    return this.regionsRepository.save(regionToUpdate);
  }

  remove(id: string) {
    return this.regionsRepository.delete({
      regionId: id,
    });
  }
}
