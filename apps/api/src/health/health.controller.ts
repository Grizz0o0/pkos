import { Controller, Get, Logger, ServiceUnavailableException } from "@nestjs/common";
import { DbService } from "../db/db.service.js";

@Controller("health")
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private dbService: DbService) {}

  @Get()
  async check() {
    try {
      // Thực hiện query đơn giản kiểm tra kết nối DB
      await this.dbService.prisma.$queryRaw`SELECT 1`;
      return {
        status: "ok",
        database: "connected",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error("Database health check failed", error);
      throw new ServiceUnavailableException({
        status: "error",
        database: "disconnected",
        timestamp: new Date().toISOString(),
      });
    }
  }
}

