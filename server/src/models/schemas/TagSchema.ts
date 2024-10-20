import mongoose, { Schema } from "mongoose";
import { EModelStatus } from "../../share/enums";
import { ITag, modelName } from "../interfaces/ITag";

export default function initTag() {
  const TagSchema = new Schema<ITag>(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: EModelStatus,
        default: EModelStatus.ACTIVE,
      },
    },
    { timestamps: true }
  );

  mongoose.model<ITag>(modelName, TagSchema);
}
