import { config } from "dotenv";
import mongoose from "mongoose";
import init from "../models/schemas";

config();

const server = process.env.DATABASE_SERVER || "mongodb://localhost:27017";
const databaseName = process.env.DATABASE_NAME || "devchu_images";
console.log(server, databaseName)
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
