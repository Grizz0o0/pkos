import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { db } from "@repo/db";

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  readonly prisma = db;

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
