import { db } from "./index.js";
async function run() {
  const count = await db.question.count();
  console.log("DATABASE_QUESTION_COUNT:", count);
  process.exit(0);
}
run().catch(console.error);
