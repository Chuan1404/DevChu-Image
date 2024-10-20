import mongoose, { Schema } from "mongoose";
import { IUser, modelName } from "../interfaces/IUser";
import { EAccountStatus, EModelStatus, EUserRole } from "../../share/enums";

export default function initUser() {
  const UserSchema = new Schema<IUser>(
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
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      role: {
        type: String,
        enum: EUserRole,
        default: EUserRole.ROLE_CUSTOMER,
      },
      status: {
        type: String,
        enum: EModelStatus,
        default: EModelStatus.ACTIVE,
      },
      accountStatus: {
        type: String,
        enum: EAccountStatus,
        default: EAccountStatus.UNVERIFIED,
      },
    },
    { timestamps: true }
  );

  mongoose.model<IUser>(modelName, UserSchema);
}
