import mongoose, { Schema } from "mongoose";
import { EModelStatus } from "../../share/enums";
import { IComment, modelName } from "../interfaces/IComment";

export default function init() {
  const CommentSchema = new Schema<IComment>(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      content: {
        type: String,
        required: true,
      },

      user: {
        type: String,
        ref: "User",
      },
      file: {
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
  mongoose.model<IComment>(modelName, CommentSchema);
}
