import mongoose, { Schema } from "mongoose";
import { EModelStatus, EPaymentMethod } from "../../share/enums";
import { IReceipt, modelName } from "../interfaces/IReceipt";

export default function initReceipt() {
  const ReceiptSchema = new Schema<IReceipt>(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      method: {
        type: String,
        enum: EPaymentMethod,
        default: EPaymentMethod.MOMO,
      },
      methodId: {
        type: String,
      },
      totalPrice: {
        type: Number,
        default: 0,
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

  mongoose.model<IReceipt>(modelName, ReceiptSchema);
}
