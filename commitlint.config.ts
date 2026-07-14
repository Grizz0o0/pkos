export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Tính năng mới
        "fix", // Bug fix
        "docs", // Chỉ thay đổi documentation
        "style", // Thay đổi format, không ảnh hưởng logic
        "refactor", // Code refactoring không phải feat hay fix
        "perf", // Cải thiện performance
        "test", // Thêm hoặc sửa tests
        "build", // Thay đổi build system hoặc dependencies
        "ci", // Thay đổi CI config
        "chore", // Các task khác không ảnh hưởng src hoặc test
        "revert", // Revert commit trước
      ],
    ],
    "subject-case": [2, "never", ["upper-case", "pascal-case", "start-case"]],
    "subject-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 120],
  },
};
