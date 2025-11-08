import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";
import { ProvidersService } from "./providers.service";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { UserData } from "src/auth/decorators/user.decorator";
import { User } from "src/auth/entities/user.entity";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/constants/roles.constants";

@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll(@UserData() user: User) {
    console.log(user);
    return this.providersService.findAll();
  }
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.providersService.findOne(id);
  }
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get("name/:name")
  findByName(@Param("name") name: string) {
    return this.providersService.findByName(name);
  }
  @Auth(ROLES.MANAGER)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProviderDto: UpdateProviderDto
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.providersService.remove(id);
  }
}
