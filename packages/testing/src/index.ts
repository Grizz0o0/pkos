/// <reference types="@testing-library/jest-dom" />

// Re-export testing utilities thường dùng
export {
  render,
  screen,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
export { userEvent } from "@testing-library/user-event";
export {
  vi,
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from "vitest";
