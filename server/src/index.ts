import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import "reflect-metadata";

import database from "./configs/database";
import setupDI from "./configs/DI";
import router from "./routes";

const PORT = process.env.PORT ?? 8080;

const app = express();

config();
setupDI();
(async () => {
  database.connect();

  // middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

  // router
  router(app);

  app.listen(PORT, () => {
    console.log(`Server run success at port ${PORT}`);
  });
})();
