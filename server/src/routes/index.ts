import { Application } from "express";
import { EUserRole } from "../share/enums";
import setupAuthRoute from "./authRoute";
import setupCommentRouter from "./commentRoute";
import setupFileUploadedRoute from "./fileUploadedRoute";
import setupTagRoute from "./tagRoute";
import setupUserRoute from "./userRoute";
declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      userRole?: EUserRole;
    }
  }
}

function router(app: Application) {
  app.use("/users", setupUserRoute());
  app.use("/auth", setupAuthRoute());
  app.use("/files", setupFileUploadedRoute());
  app.use("/comments", setupCommentRouter());
  app.use("/tags", setupTagRoute());
}

export default router;
