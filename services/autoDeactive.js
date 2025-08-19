// Finds devices older than 24 hours.
// Updates their status.

import cron from "node-cron";
import Device from "../models/device.model.js";

cron.schedule("*/5 * * * *", async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  await Device.updateMany(
    {
      createdAt: { $lte: twentyFourHoursAgo },
      status: { $ne: "deactivated" }, // or whatever status you're setting
    },
    {
      $set: { status: "deactivated" },
    }
  );

  console.log("Updated deactivated devices");
});
