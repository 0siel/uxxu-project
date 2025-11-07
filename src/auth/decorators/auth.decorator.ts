import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "../guards/roles.guard";
import { AuthGuard } from "../guards/auth.guard";

export const Auth = (...roles: string[]) => {
  const allRoles = new Set(roles);
  allRoles.add("Admin");
  return applyDecorators(
    Roles(Array.from(allRoles)),
    UseGuards(AuthGuard, RolesGuard)
  );
};
