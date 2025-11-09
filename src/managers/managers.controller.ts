import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ManagersService } from "./managers.service";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/constants/roles.constants";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("managers")
@Controller("managers")
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Auth()
  @ApiResponse({
    status: 201,
    description: "Manager created successfully.",
    example: {
      managerId: "b1a2b3c4-d5e6-7f89-0a1b-2c3d4e5f6a7b",
      managerFullName: "Osiel Hernandez",
      managerSalary: 15000,
      managerEmail: "osiel.hernandez@uxxu.com",
      managerPhoneNumber: "5512345678",
    },
  })
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.managersService.findOne(id);
  }

  @Auth()
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @Auth()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.managersService.remove(id);
  }
}
