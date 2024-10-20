import { Application } from "express";
import userRouter from "./userRoute";
import authRouter from "./authRoute";
import { EUserRole } from "../share/enums";
declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      userRole?: EUserRole;
    }
  }
}

function router(app: Application) {
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
}

export default router;
