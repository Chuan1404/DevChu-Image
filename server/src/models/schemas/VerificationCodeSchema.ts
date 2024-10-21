import mongoose, { Schema } from "mongoose";
import { EModelStatus } from "../../share/enums";
import {
  IVerificationCode,
  modelName,
} from "../interfaces/IVerificationCode";

export default function initVerificationCode() {
  const VerificationCodeSchema = new Schema<IVerificationCode>(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      value: {
        type: String,
      },
      userId: {
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

  mongoose.model<IVerificationCode>(modelName, VerificationCodeSchema);
}
