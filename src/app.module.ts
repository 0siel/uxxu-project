import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmployeesModule } from "./employees/employees.module";
import { ProductsModule } from "./products/products.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ProvidersModule } from "./providers/providers.module";
import { ManagersModule } from "./managers/managers.module";
import { LocationsModule } from "./locations/locations.module";
import { RegionsModule } from "./regions/regions.module";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { JWT_KEY } from "./auth/constants/jwt.constants";

@Module({
  imports: [
    EmployeesModule,
    ProductsModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: JWT_KEY,
      signOptions: { expiresIn: "30s" },
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.host,
      port: +(process.env.port ?? 5432),
      username: "postgres",
      password: process.env.pass,
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProvidersModule,
    ManagersModule,
    LocationsModule,
    RegionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
