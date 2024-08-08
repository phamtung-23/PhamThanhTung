import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import { connect } from "db/connectDB";
import APIRoute from '@routes/index';
import handleResponse from "@middleware/handleResponse";
import "dotenv/config";



const app = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", APIRoute);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next({
    code: -13,
    message: `api not found`,
  });
});
app.use(handleResponse);

app.listen(PORT, () =>
  connect(PORT)
)