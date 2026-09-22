import * as dotenv from "dotenv";
dotenv.config();
import { createBot } from "./index";

async function main() {
  const client = await createBot();
  try {
    await client.login(client.config.token);
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
  process.on("SIGTERM", async () => {
    const mongoose = await import("mongoose");
    await mongoose.default.disconnect();
    client.destroy();
    process.exit(0);
  });
  process.on("uncaughtException", (e) => console.error("Uncaught:", e));
  process.on("unhandledRejection", (r) => console.error("Unhandled:", r));
}
main();
