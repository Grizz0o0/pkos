import { Button } from "@repo/ui/button";
import { Badge } from "@repo/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { BookOpen, Brain, BarChart3, Repeat2, Zap, Shield } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: BookOpen,
    title: "Markdown → Quiz",
    description:
      "AI tự động chuyển đổi ghi chú Markdown thành câu hỏi ôn tập thông minh.",
  },
  {
    icon: Brain,
    title: "Spaced Repetition",
    description:
      "Thuật toán nhắc nhở thông minh giúp bạn ghi nhớ lâu hơn với ít effort hơn.",
  },
  {
    icon: BarChart3,
    title: "Learning Analytics",
    description:
      "Dashboard phân tích tiến trình học tập theo thời gian thực và chi tiết.",
  },
  {
    icon: Repeat2,
    title: "Active Recall",
    description:
      "Phương pháp học chủ động giúp củng cố kiến thức hiệu quả gấp nhiều lần.",
  },
  {
    icon: Zap,
    title: "AI-Powered",
    description:
      "Tích hợp LLM để tạo câu hỏi đa dạng, giải thích, và gợi ý học tập.",
  },
  {
    icon: Shield,
    title: "Privacy-First",
    description:
      "Dữ liệu của bạn là của bạn. Bảo mật tuyệt đối với mã hóa end-to-end.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">PKOS</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Tính năng
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Giá cả
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Đăng nhập</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Bắt đầu miễn phí</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 max-w-7xl py-24 text-center">
        <Badge variant="secondary" className="mb-6">
          🚀 Đang trong giai đoạn phát triển
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          Biến ghi chú thành
          <br />
          kiến thức vĩnh cửu
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          PKOS dùng AI để chuyển đổi Markdown notes của bạn thành hệ thống học
          tập thông minh — quiz, spaced repetition, và analytics trong một nơi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/sign-up">Bắt đầu miễn phí →</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#">Xem demo</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 max-w-7xl pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Tất cả những gì bạn cần
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Một nền tảng tích hợp để quản lý và tối ưu hành trình học tập của
            bạn.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border/50 hover:border-primary/30 transition-colors"
            >
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Sẵn sàng học hiệu quả hơn?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Tham gia cùng hàng nghìn người dùng đang cải thiện việc học với
            PKOS.
          </p>
          <Button size="lg" asChild>
            <Link href="/sign-up">Tạo tài khoản miễn phí</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="container mx-auto px-4 max-w-7xl py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            <span>© 2026 PKOS. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
