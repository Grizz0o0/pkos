import { Module } from "@nestjs/common";
import { DbModule } from "./db/db.module.js";
import { HealthController } from "./v1/health/health.controller.js";
import { UsersModule } from "./v1/users/users.module.js";

@Module({
  imports: [DbModule, UsersModule],
  controllers: [HealthController],
})
export class AppModule {}
