import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập | PKOS",
  description: "Đăng nhập vào tài khoản PKOS của bạn",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-4">Đăng nhập</h1>
        <p className="text-muted-foreground mb-8">
          Trang đăng nhập đang được phát triển.
        </p>
      </div>
    </div>
  );
}
