import "reflect-metadata";
import express, { Request, Response, NextFunction, response } from "express";
import "express-async-errors";
import routes from "./routes";
import uploadConfig from "./config/upload";
import AppError from "./errors/AppError";

import "./database";

const app = express();

app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (process.env.NODE_ENV === "development") {
    return res.status(500).json({ status: "error", message: err.message });
  }

  return res
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

app.listen(3333, () => {
  console.log("Server startado na porta 3333");
});
