import { Application } from "express";
import userRouter from "./userRoute";

function router(app: Application) {
  app.use("/user", userRouter);
}

export default router;
