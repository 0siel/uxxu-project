import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    },
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("UxxU Project")
    .setDescription("The UxxU Project API description")
    .setVersion("0.9")
    .addTag("UxxU")
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  await app.listen(4000);
}
bootstrap();
