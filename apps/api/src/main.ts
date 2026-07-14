import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { env } from "@repo/env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cho phép CORS cho Next.js Client
  app.enableCors({
    origin: [env.NEXT_PUBLIC_APP_URL],
    credentials: true,
  });

  const port = process.env["PORT"] || 4000;
  await app.listen(port);
  console.log(`🚀 NestJS Backend API running on: http://localhost:${port}`);
}

bootstrap();
