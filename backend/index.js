/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";

const app = express();
const prot = 3000;
const origin = "http://localhost:5173";
const dataBaseUrl = "mongodb://localhost:27017/TodoApp";

console.log("Hello world");

mongoose
  .connect(dataBaseUrl)
  .then(() => console.log("Connected to database"))
  .catch(() => {
    console.log("Error in connecting to database");
    process.exit();
  });

app.use(cors({ origin: origin }));
app.use(express.json());

app.use("/api", routes);

app.listen(prot, () => {
  console.log(`Server is Listining at prot ${prot}`);
});
