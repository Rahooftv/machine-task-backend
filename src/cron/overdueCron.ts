import cron from "node-cron";
import { Task } from "../modules/task/task.model";

export const startOverdueCron = () => {

  cron.schedule("0 0 * * *", async () => {
    console.log("Running Overdue Task Cron")

    await Task.updateMany(
      {
        status: { $ne: "completed" },
        dueDate: { $lt: new Date() },
      },
      { status: "overdue" }
    );

    console.log(" Overdue Tasks Updated")
  });
};
