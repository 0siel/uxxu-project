import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiAuth = () => {
  return applyDecorators(
    ApiResponse({ status: 401, description: "Missing or invalid token" }),
    ApiResponse({ status: 403, description: "Forbidden access" }),
    ApiResponse({ status: 404, description: "Resource not found" }),
    ApiResponse({ status: 500, description: "Internal server error" })
  );
};
