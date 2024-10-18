import mongoose from "mongoose";
import { config } from "dotenv";

config();

const server = process.env.SERVER;
const databaseName = process.env.DATABASE_NAME;
const database = {
  connect: () => {
    mongoose
      .connect(`mongodb://${server}/${databaseName}`)
      .then(() => {
        console.log("Connect database success");
      })
      .catch(() => {
        console.log("Fail to connect database");
      });
  },
};

export default database;
