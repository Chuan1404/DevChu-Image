import { config } from "dotenv";
import mongoose from "mongoose";
import init from "../models/schemas";

config();

const server = process.env.DATABASE_SERVER;
const databaseName = process.env.DATABASE_NAME;
const database = {
  connect: () => {
    mongoose
      .connect(`${server}/${databaseName}`)
      .then(() => {
        console.log("Connect database success");
        init();
      })
      .catch(() => {
        console.log("Fail to connect database");
      });
  },
};

export default database;
