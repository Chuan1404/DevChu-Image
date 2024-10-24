import mongoose, { Schema } from "mongoose";
import { EModelStatus } from "../../share/enums";
import { IRefreshToken, modelName } from "../interfaces/IRefreshToken";

export default function initRefreshToken() {
  const refreshTokenSchema = new Schema<IRefreshToken>(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      token: {
        type: String,
      },
      expireDate: {
        type: Date,
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

  mongoose.model<IRefreshToken>(modelName, refreshTokenSchema);
}
