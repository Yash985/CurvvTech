import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: String,
    status: String,
    last_active_at: {
      type: Date,
      default: null,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Log",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const Device = mongoose.models.Device || mongoose.model("Device", deviceSchema);

export default Device;
