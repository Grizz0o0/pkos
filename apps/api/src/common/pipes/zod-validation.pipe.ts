import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { ZodSchema, ZodIssue } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException({
        message: "Dữ liệu đầu vào không hợp lệ",
        errors: result.error.errors.map((err: ZodIssue) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }
    return result.data;
  }
}
