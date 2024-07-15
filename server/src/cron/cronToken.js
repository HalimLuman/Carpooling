import cron from "node-cron";
import { handleExpiredPosts } from "../controllers/postController.js";

const scheduleCronJobs = () => {
  // Schedule the task to run every day at midnight
  cron.schedule("0 0 * * *", async () => {
    await handleExpiredPosts();
  });
};

export default scheduleCronJobs;
