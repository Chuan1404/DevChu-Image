import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";

import database from "./configs/database";
import router from "./routes";
import setupDI from "./DI";

const PORT = process.env.PORT || 8080;

const app = express();

config();
setupDI();
(async () => {
  await database.connect();

  // middleware
  app.use(cors());
  app.use(bodyParser.json());

  // router
  router(app);

  app.listen(PORT, () => {
    console.log(`Server run success at port ${PORT}`);
  });
})();
