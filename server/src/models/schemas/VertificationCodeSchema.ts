import mongoose, { Schema } from "mongoose";
import { EModelStatus } from "../../share/enums";
import {
  IVertificationCode,
  modelName,
} from "../interfaces/IVertificationCode";

export default function init() {
  const VertificationCodeSchema = new Schema<IVertificationCode>(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      value: {
        type: String,
      },
      user: {
        type: String,
        ref: "User",
      },

      status: {
        type: String,
        enum: EModelStatus,
        default: EModelStatus.ACTIVE,
      },
    },
    { timestamps: true }
  );

  mongoose.model<IVertificationCode>(modelName, VertificationCodeSchema);
}
