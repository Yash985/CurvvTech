import express from "express";
import {
  allDevices,
  createLogEntry,
  deleteDevice,
  getLogs,
  getUsage,
  registerDevice,
  updateDevice,
  updateLastActive,
} from "../controllers/device.controller.js";
import { AuthenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", AuthenticateUser, registerDevice);
router.get("/", AuthenticateUser, allDevices);
router.patch("/:id", AuthenticateUser, updateDevice);
router.delete("/:id", AuthenticateUser, deleteDevice);
router.post("/:id/heartbeat", AuthenticateUser, updateLastActive);

//analytics
router.post("/:id/logs", AuthenticateUser, createLogEntry);

//fetch last 10 records
// router.get("/:id/logs?limit=10", AuthenticateUser, getLogs);
router.get("/:id/logs", AuthenticateUser, getLogs);

//aggreagated uages
router.get("/:id/usage", AuthenticateUser, getUsage);
// router.get("/:id//usage?range=24h", AuthenticateUser, getUsage);

export default router;
