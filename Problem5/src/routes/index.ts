import express, { Router } from "express";
import MenuRoute from "@routes/menu";
const route: Router = express.Router();

route.use("/menu", MenuRoute);
export default route;