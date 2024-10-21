import mongoose, { Schema } from "mongoose";
import { EFileType, EModelStatus } from "../../share/enums";
import { IFileUploaded, modelName } from "../interfaces/IFileUploaded";

export default function initFileUploaded() {
  const FileUploadedSchema = new Schema<IFileUploaded>(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      title: {
        type: String,
      },
      display: {
        type: String,
      },
      high: {
        type: String,
      },
      medium: {
        type: String,
      },
      root: {
        type: String,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      price: {
        type: Number,
      },
      size: {
        type: Number,
      },
      userId: {
        type: String,
        ref: "User",
      },
      fileType: {
        type: String,
        enum: EFileType,
      },
      status: {
        type: String,
        enum: EModelStatus,
        default: EModelStatus.ACTIVE,
      },
    },
    { timestamps: true }
  );

  mongoose.model<IFileUploaded>(modelName, FileUploadedSchema);
}
