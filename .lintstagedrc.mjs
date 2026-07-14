export default {
  "*.{ts,tsx}": ["eslint --fix --max-warnings 0", "prettier --write"],
  "*.{js,mjs,cjs}": ["prettier --write"],
  "*.{json,yaml,yml}": ["prettier --write"],
  "*.{css,scss}": ["prettier --write"],
  "*.md": ["prettier --write"],
  "*.prisma": ["pnpm prisma format"],
};
