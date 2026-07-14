import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Decorator lấy thông tin User hiện tại từ request (được gán bởi AuthGuard)
 * @example
 * @UseGuards(AuthGuard)
 * @Get('me')
 * getProfile(@CurrentUser() user: User) {
 *   return user;
 * }
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
