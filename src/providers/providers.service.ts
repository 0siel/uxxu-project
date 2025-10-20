import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from "./entities/provider.entity";
import { Repository, ILike } from "typeorm";

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    const provider = this.providersRepository.save(createProviderDto);
    return provider;
  }

  findAll() {
    return this.providersRepository.find();
  }

  async findOne(id: string) {
    const provider = await this.providersRepository.findOneBy({
      providerId: id,
    });
    if (!provider)
      throw new NotFoundException(`Provider with ID ${id} not found`);
    return provider;
  }

  async findByName(name: string): Promise<Provider[]> {
    return this.providersRepository.find({
      where: {
        providerName: ILike(`%${name}%`),
      },
      order: { providerName: "ASC" },
    });
  }

  async update(
    id: string,
    updateProviderDto: UpdateProviderDto
  ): Promise<Provider> {
    const providerToUpdate = await this.providersRepository.preload({
      providerId: id,
      ...updateProviderDto,
    });

    if (!providerToUpdate)
      throw new NotFoundException(`Provider whit id ${id} not found`);

    return this.providersRepository.save(providerToUpdate);
  }

  async remove(id: string) {
    const result = await this.providersRepository.delete({ providerId: id });

    if (result.affected === 0)
      throw new NotFoundException(`Provider with ID ${id} not found`);

    return `Provider deleted`;
  }
}
