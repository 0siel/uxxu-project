import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LocationsService } from "./locations.service";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/constants/roles.constants";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Location } from "./entities/location.entity";

@ApiTags("locations")
@Controller("locations")
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Auth()
  @ApiResponse({
    status: 201,
    description: "Location created successfully.",
    example: {
      locationId: 1,
      locationName: "UxxU HQ",
      locationAddress:
        "Blvd. Universitarios 3001, Juriquilla, Querétaro, Qro., México",
      locationLatLng: [20.705780429282996, -100.44267442529818],
    } as Location,
  })
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.locationsService.findOne(id);
  }

  @Auth()
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updateLocationDto: UpdateLocationDto
  ) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Auth()
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.locationsService.remove(id);
  }
}
