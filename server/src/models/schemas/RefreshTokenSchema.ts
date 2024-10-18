import mongoose, { Schema } from "mongoose";
import { EModelStatus } from "../../share/enums";
import { IRefreshToken, modelName } from "../interfaces/IRefreshToken";

export default function init() {
  const RefreshTokenSchema = new Schema<IRefreshToken>(
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

  mongoose.model<IRefreshToken>(modelName, RefreshTokenSchema);
}
