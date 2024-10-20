import { Application } from "express";
import userRouter from "./userRoute";
import authRouter from "./authRoute";

function router(app: Application) {
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
}

export default router;
