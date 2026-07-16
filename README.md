# PKOS - Monorepo Web Application

Dự án PKOS là một ứng dụng web hiện đại được xây dựng trên mô hình **Monorepo** sử dụng **Turborepo** và **pnpm Workspaces** làm công cụ quản lý.

---

## 1. Kiến Trúc Dự Án

Hệ thống được tổ chức thành hai khu vực chính: `apps` (ứng dụng chạy độc lập) và `packages` (các thư viện/code dùng chung).

```text
pkos/
├── apps/
│   ├── api/          # Backend API (NestJS)
│   ├── web/          # Frontend Web Application (NextJS - App Router)
│   └── docs/         # Tài liệu dự án (NextJS)
└── packages/
    ├── shared/       # Package chứa code dùng chung (DTOs, Schemas, Constants)
    ├── db/           # Cấu hình kết nối cơ sở dữ liệu (Prisma client)
    ├── env/          # Quản lý và validate biến môi trường
    ├── ui/           # Thư viện component React dùng chung cho UI
    ├── typescript-config/ # Cấu hình TypeScript dùng chung
    ├── eslint-config/     # Cấu hình ESLint tiêu chuẩn dùng chung
    └── testing/      # Cấu hình công cụ kiểm thử (Vitest, Playwright)
```

---

## 2. Yêu Cầu Môi Trường

Để khởi chạy dự án, hệ thống cần được cài đặt sẵn:
- **Node.js**: Phiên bản `>= 18` (khuyến nghị dùng bản LTS mới nhất).
- **pnpm**: Phiên bản `^11.12.0` (Trình quản lý gói chính của dự án).

---

## 3. Cấu Hình Biến Môi Trường (`.env`)

Sao chép tệp tin cấu hình mẫu tại thư mục gốc và điền các tham số cần thiết:

```bash
cp .env.example .env
```

Các biến môi trường cơ bản:
- `DATABASE_URL`: Đường dẫn kết nối database PostgreSQL.
- `NEXT_PUBLIC_APP_URL`: Địa chỉ chạy frontend web (mặc định `http://localhost:3000`).
- `PORT`: Cổng chạy ứng dụng backend NestJS (mặc định `4000`).

---

## 4. Các Lệnh Chạy Dự Án

Chạy tất cả các lệnh từ thư mục gốc của Monorepo:

### Phát triển (Development)
Khởi động tất cả ứng dụng ở chế độ hot-reload:
```bash
pnpm dev
```

### Biên dịch (Build)
Biên dịch toàn bộ Monorepo cho môi trường Production:
```bash
pnpm build
```

### Database & Migrations (Prisma)
- **Tạo Prisma Client**: `pnpm db:generate`
- **Tạo và chạy Database Migrations**: `pnpm db:migrate`
- **Đẩy cấu hình schema trực tiếp (không tạo migration)**: `pnpm db:push`

### Lint & Định dạng code (Lint & Format)
- **Kiểm tra cú pháp**: `pnpm lint`
- **Định dạng tự động với Prettier**: `pnpm format`
- **Kiểm tra kiểu dữ liệu TypeScript**: `pnpm check-types`

### Kiểm thử (Testing)
- **Chạy unit tests**: `pnpm test`
- **Chạy End-to-End tests (Playwright)**: `pnpm test:e2e`

---

## 5. Quy Ước Package `@repo/shared` (Subpath Exports)

Để tránh tình trạng lẫn lộn import giữa hằng số, schema và types, package `@repo/shared` được cấu hình để xuất khẩu theo các đường dẫn con chuyên biệt (Subpath Exports):

- **Schemas Validation (Zod)**:
  ```typescript
  import { CreateUserSchema } from "@repo/shared/schemas";
  ```
- **Shared Types & Interfaces**:
  ```typescript
  import { CreateUserInput, UserDto } from "@repo/shared/types";
  ```
- **Shared Constants**:
  ```typescript
  import { API_VERSION } from "@repo/shared/constants";
  ```

Quy ước này giúp code gọn gàng, tăng tốc độ phân tích kiểu dữ liệu của IDE và tránh import vòng lặp.
