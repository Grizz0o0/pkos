import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request } from "express";
import { auth } from "@repo/auth";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Chuyển đổi Express headers sang Web API Standard Headers cho Better Auth
    const session = await auth.api.getSession({
      headers: new Headers(request.headers as any),
    });

    if (!session) {
      throw new UnauthorizedException("Phiên đăng nhập không hợp lệ hoặc đã hết hạn");
    }

    // Lưu user & session vào request object để sử dụng ở Controllers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (request as any).user = session.user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (request as any).session = session.session;

    return true;
  }
}
