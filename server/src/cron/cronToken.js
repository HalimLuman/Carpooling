import cron from "node-cron";
import { handleExpiredPosts } from "../controllers/postController.js";

const scheduleCronJobs = () => {
  // Schedule the task to run every day at midnight
  cron.schedule("39 14 * * *", async () => {
    await handleExpiredPosts();
  });
};

export default scheduleCronJobs;
