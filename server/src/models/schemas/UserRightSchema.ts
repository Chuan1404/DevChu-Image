import mongoose, { Schema } from "mongoose";
import { EModelStatus } from "../../share/enums";
import { IUserRight, modelName } from "../interfaces/IUserRight";

export default function initUserRight() {
  const UserRightSchema = new Schema<IUserRight>(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      expireDate: {
        type: Date,
      },
      userId: {
        type: String,
        ref: "User",
      },
      fileId: {
        type: String,
        ref: "FileUploaded",
      },
      status: {
        type: String,
        enum: EModelStatus,
        default: EModelStatus.ACTIVE,
      },
    },
    { timestamps: true }
  );

  mongoose.model<IUserRight>(modelName, UserRightSchema);
}
