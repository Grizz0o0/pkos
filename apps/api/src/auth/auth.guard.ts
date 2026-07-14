import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request } from "express";
import { DbService } from "../db/db.service.js";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private dbService: DbService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("Không tìm thấy Session Token");
    }

    // Xác thực session trực tiếp từ database
    const session = await this.dbService.prisma.session.findUnique({
      where: { token },
      include: {
        user: true,
      },
    });

    if (!session) {
      throw new UnauthorizedException("Session không tồn tại");
    }

    if (session.expiresAt < new Date()) {
      throw new UnauthorizedException("Session đã hết hạn");
    }

    // Lưu user & session vào request object để sử dụng ở Controllers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (request as any).user = session.user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (request as any).session = session;

    return true;
  }

  private extractToken(request: Request): string | null {
    // 1. Kiểm tra từ Authorization Header (Bearer Token)
    const authHeader = request.headers["authorization"];
    if (authHeader && typeof authHeader === "string") {
      const [type, token] = authHeader.split(" ");
      if (type === "Bearer" && token) {
        return token;
      }
    }

    // 2. Kiểm tra từ Cookie (better-auth.session_token)
    const cookieHeader = request.headers["cookie"];
    if (cookieHeader && typeof cookieHeader === "string") {
      const cookies = cookieHeader.split(";").reduce((acc: Record<string, string>, c) => {
        const [name, val] = c.trim().split("=");
        if (name && val) {
          acc[name] = val;
        }
        return acc;
      }, {});

      // Better Auth session cookie name mặc định là better-auth.session_token
      return cookies["better-auth.session_token"] || null;
    }

    return null;
  }
}
