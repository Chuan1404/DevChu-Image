import { Application } from "express";
import userRouter from "./userRoute";

function router(app: Application) {
  app.use("/users", userRouter);
}

export default router;
