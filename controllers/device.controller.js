import Device from "../models/device.model.js";
import Log from "../models/log.model.js";
import User from "../models/user.model.js";
import {
  LogEntrySchema,
  NewDeviceSchema,
  UpdateDeviceSchema,
} from "../validations/device.validation.js";
export const registerDevice = async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id)
      return res.status(403).json({ success: false, message: "Unauthorized" });
    // const user = await User.find({ _id: user_id });
    // if (!user)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "User Does not exist" });
    const isValid = NewDeviceSchema.safeParse(req.body);
    if (!isValid.success) {
      const errorMessages = isValid.error.issues.map((err) => {
        return `${err.message}`;
      });
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: errorMessages,
      });
    }
    const { name, type, status } = isValid.data;
    const newDevice = new Device({
      name,
      type,
      status,
      owner_id: user_id,
    });
    await newDevice.save();
    return res.status(201).json({ success: true, newDevice });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Errow while registering device" });
  }
};

//Filter by type,status also
export const allDevices = async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id)
      return res.status(403).json({ success: false, message: "Unauthorized" });
    const { type, status } = req.query;

    const query = {};

    if (type) query.type = type;
    if (status) query.status = status;

    const allDevices = await Device.find(query);
    return res.status(200).json({ success: true, allDevices });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Errow while fetching all devices" });
  }
};

export const updateDevice = async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id)
      return res.status(403).json({ success: false, message: "Unauthorized" });
    const isValid = UpdateDeviceSchema.safeParse(req.body);

    if (!isValid.success) {
      const errorMessages = isValid.error.issues.map((err) => {
        return `${err.message}`;
      });
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: errorMessages,
      });
    }

    const dataToUpdate = isValid.data;

    const device_id = req.params.id;
    const updatedDevice = await Device.findOneAndUpdate(
      { _id: device_id },
      dataToUpdate,
      { new: true, runValidators: true }
    );

    if (!updatedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Device updated successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Errow while updating device" });
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id)
      return res.status(403).json({ success: false, message: "Unauthorized" });

    const device_id = req.params.id;
    const deletedDevice = await Device.findOneAndDelete({ _id: device_id });

    if (!deletedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Device deleted successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Errow while deleting device" });
  }
};

export const updateLastActive = async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id)
      return res.status(403).json({ success: false, message: "Unauthorized" });
    const { status } = req.body;
    if (status != "active")
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    const device_id = req.params.id;
    const updatedHeartbeat = await Device.findOneAndUpdate(
      { _id: device_id },
      { last_active_at: Date.now() },
      { new: true }
    );

    if (!updatedHeartbeat) {
      return res.status(404).json({ message: "Device not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Device hearbeat recorded",
      last_active_at: updatedHeartbeat.last_active_at,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Errow while updating heartbeat" });
  }
};

//Analytics

//------------------------------------------------------------------
//Check this fucntion
//------------------------------------------------------------------
export const createLogEntry = async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id)
      return res.status(403).json({ success: false, message: "Unauthorized" });

    const isValid = LogEntrySchema.safeParse(req.body);
    if (!isValid.success) {
      const errorMessages = isValid.error.issues.map((err) => {
        return `${err.message}`;
      });
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: errorMessages,
      });
    }
    const { event, value } = isValid.data;

    const newEntry = new Log({
      event,
      value,
    });
    await newEntry.save();
    const device_id = req.params.id;
    const updatedDevice = await Device.findByIdAndUpdate(
      device_id,
      { $push: { logs: newEntry } },
      { new: true }
    );
    await updatedDevice.save();
    return res
      .status(201)
      .json({ success: true, message: "Log created successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Errow while creating log entry." });
  }
};
export const getLogs = async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id)
      return res.status(403).json({ success: false, message: "Unauthorized" });

    const device_id = req.params.id;
    const limitQuery = req.query.limit || 10;
    const logs = await Device.find({
      _id: device_id,
    })
      .select("logs")
      .populate({
        path: "logs",
        options: { limit: limitQuery },
      });

    return res.status(200).json({ success: true, logs });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Errow while getting logs." });
  }
};
export const getUsage = async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id)
      return res.status(403).json({ success: false, message: "Unauthorized" });

    const device_id = req.params.id;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const deviceWithLogs = await Device.findById(device_id)
      .select("logs")
      .populate({
        path: "logs",
        match: { createdAt: { $gte: oneDayAgo } },
        options: { sort: { createdAt: -1 }, limit: 10 },
      });
    let total_units_last_24h = 0;
    deviceWithLogs.logs.map((log) => (total_units_last_24h += log.value));

    return res
      .status(200)
      .json({ success: true, device_id, total_units_last_24h });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Errow while getting usage." });
  }
};
