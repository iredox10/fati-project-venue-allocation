import express from "express";
import mongoose from "mongoose";
import routes from './routes/routes.js'
import cors from 'cors'
mongoose
  .connect("mongodb://localhost/allocation-app",{})
  .then((res) => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors('*'))
app.use(routes)



app.listen(3003, () => console.log("connect to server"));
