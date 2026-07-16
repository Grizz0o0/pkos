import { Injectable } from "@nestjs/common";
import { DbService } from "../../db/db.service.js";
import { CreateUserInput } from "@repo/shared/schemas";
import { UserDto } from "@repo/shared/types";

@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(input: CreateUserInput): Promise<UserDto> {
    // Mô phỏng tạo user mới để trả về kết quả mẫu
    return {
      id: Math.random().toString(36).substring(7),
      email: input.email,
      name: input.name,
      createdAt: new Date(),
    };
  }
}
