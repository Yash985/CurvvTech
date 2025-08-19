import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    event: String,
    value: Number,
    // device_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Device",
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Log = mongoose.models.Log || mongoose.model("Log", logSchema);

export default Log;
