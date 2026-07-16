import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải chứa ít nhất 6 ký tự"),
  name: z.string().min(2, "Tên phải chứa ít nhất 2 ký tự").optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
