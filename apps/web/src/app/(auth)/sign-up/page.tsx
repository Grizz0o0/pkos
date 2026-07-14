import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký | PKOS",
  description: "Tạo tài khoản PKOS mới",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-4">Đăng ký</h1>
        <p className="text-muted-foreground mb-8">
          Trang đăng ký đang được phát triển.
        </p>
      </div>
    </div>
  );
}
