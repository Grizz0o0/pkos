import { db } from "@repo/db";

async function seed() {
  console.log("🌱 Bắt đầu seed database...");

  // 1. Tạo User Admin mặc định
  const adminEmail = "vuonghongky26@gmail.com";
  let admin = await db.user.findUnique({
    where: { email: adminEmail },
  });

  if (!admin) {
    admin = await db.user.create({
      data: {
        id: "admin-user-id",
        name: "Admin",
        email: adminEmail,
        emailVerified: true,
      },
    });
    console.log("👉 Đã tạo user admin mặc định:", adminEmail);
  } else {
    console.log("👉 User admin đã tồn tại:", adminEmail);
  }

  // 2. Tạo một số câu hỏi mẫu
  console.log("👉 Đang tạo danh sách câu hỏi mẫu...");
  const questionsData = [
    {
      id: "q-react-1",
      type: "SINGLE_CHOICE" as const,
      question: "React sử dụng cơ chế nào để tối ưu hóa việc render UI?",
      options: [
        "Real DOM",
        "Virtual DOM",
        "Shadow DOM",
        "Document Fragment"
      ],
      answer: [1], // Index 1: Virtual DOM
      explanation: "React sử dụng Virtual DOM để lưu trữ trạng thái giao diện trong bộ nhớ, tính toán sự khác biệt (diffing) và chỉ cập nhật các phần thay đổi lên Real DOM thực tế, giúp tối ưu hiệu năng.",
      topic: "React",
      tags: ["frontend", "react", "core"]
    },
    {
      id: "q-react-2",
      type: "TRUE_FALSE" as const,
      question: "Trong React, Props có thể bị thay đổi (mutable) trực tiếp từ bên trong component nhận chúng.",
      options: [
        "Đúng",
        "Sai"
      ],
      answer: [1], // Index 1: Sai (Props là immutable)
      explanation: "Props truyền từ component cha xuống component con là bất biến (immutable). Component con chỉ có thể đọc và không được phép sửa đổi trực tiếp props.",
      topic: "React",
      tags: ["frontend", "react", "props"]
    },
    {
      id: "q-next-1",
      type: "SINGLE_CHOICE" as const,
      question: "Next.js App Router sử dụng thư mục nào làm gốc để định nghĩa các route?",
      options: [
        "pages",
        "routes",
        "src/app",
        "views"
      ],
      answer: [2], // Index 2: src/app
      explanation: "Từ phiên bản 13, Next.js giới thiệu App Router, sử dụng thư mục 'app' (thường nằm dưới 'src' hoặc root) để định nghĩa cấu trúc định tuyến dựa trên thư mục.",
      topic: "NextJS",
      tags: ["frontend", "nextjs", "routing"]
    },
    {
      id: "q-node-1",
      type: "MULTIPLE_CHOICE" as const,
      question: "Những mô-đun nào sau đây được tích hợp sẵn trong NodeJS core?",
      options: [
        "fs (File System)",
        "express",
        "path",
        "prisma"
      ],
      answer: [0, 2], // Index 0 và 2: fs và path
      explanation: "'fs' và 'path' là các core module của NodeJS. 'express' và 'prisma' là thư viện của bên thứ ba cần cài đặt qua npm/pnpm.",
      topic: "NodeJS",
      tags: ["backend", "nodejs", "core"]
    },
    {
      id: "q-prisma-1",
      type: "SINGLE_CHOICE" as const,
      question: "Trong Prisma, lệnh nào được dùng để đồng bộ database schema với file schema.prisma trên môi trường phát triển (development)?",
      options: [
        "prisma db seed",
        "prisma generate",
        "prisma migrate dev",
        "prisma studio"
      ],
      answer: [2], // Index 2: prisma migrate dev
      explanation: "'prisma migrate dev' được sử dụng để tạo và chạy các file migration, đồng thời cập nhật database schema phù hợp với những thay đổi trong file schema.prisma.",
      topic: "Prisma",
      tags: ["database", "prisma", "migration"]
    }
  ];

  for (const q of questionsData) {
    await db.question.upsert({
      where: { id: q.id },
      update: q,
      create: q,
    });
  }
  console.log("👉 Đã tạo/cập nhật các câu hỏi mẫu.");

  // 3. Tạo một bộ Quiz mẫu
  console.log("👉 Đang tạo Quiz mẫu...");
  const quizId = "sample-quiz-react-next";
  await db.quiz.upsert({
    where: { id: quizId },
    update: {
      title: "Trắc nghiệm kiến thức React & NextJS cơ bản",
      description: "Bài kiểm tra nhanh gồm các câu hỏi về React Virtual DOM, Props, và Routing trong Next.js App Router.",
    },
    create: {
      id: quizId,
      title: "Trắc nghiệm kiến thức React & NextJS cơ bản",
      description: "Bài kiểm tra nhanh gồm các câu hỏi về React Virtual DOM, Props, và Routing trong Next.js App Router.",
    },
  });

  // Liên kết câu hỏi vào Quiz
  const quizQuestionRelations = [
    { quizId, questionId: "q-react-1", order: 1 },
    { quizId, questionId: "q-react-2", order: 2 },
    { quizId, questionId: "q-next-1", order: 3 },
  ];

  for (const rel of quizQuestionRelations) {
    await db.quizQuestion.upsert({
      where: {
        quizId_questionId: {
          quizId: rel.quizId,
          questionId: rel.questionId,
        },
      },
      update: { order: rel.order },
      create: rel,
    });
  }
  console.log("👉 Đã liên kết câu hỏi với Quiz mẫu.");

  console.log("✅ Seed hoàn thành!");
  await db.$disconnect();
}

seed().catch((e) => {
  console.error("❌ Seed thất bại:", e);
  process.exit(1);
});
