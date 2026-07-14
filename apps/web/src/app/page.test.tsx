import { render, screen } from "@repo/testing";
import HomePage from "./page";
import { expect, test } from "vitest";

test("renders landing page", () => {
  render(<HomePage />);
  // Kiểm tra text tiêu đề có xuất hiện không
  expect(screen.getByText(/Biến ghi chú thành/)).toBeInTheDocument();
});
