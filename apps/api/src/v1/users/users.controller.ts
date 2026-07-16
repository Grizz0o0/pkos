import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe.js";
import { CreateUserSchema, CreateUserInput } from "@repo/shared/schemas";
import { UserDto } from "@repo/shared/types";

export class CreateUserDto implements CreateUserInput {
  email!: string;
  password!: string;
  name?: string;
}

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }
}
