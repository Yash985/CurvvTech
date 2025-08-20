import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    event: {
      type:String,
      required: true,
      trim:true
    },
    value: {
      type:Number,
      required: true,
      trim:true
    },
  },
  { timestamps: true }
);

const Log = mongoose.models.Log || mongoose.model("Log", logSchema);

export default Log;
