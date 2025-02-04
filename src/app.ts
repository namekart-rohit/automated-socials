import express from "express";
import cors from "cors";
import { corsUrl } from "./config";
import Logger from "./core/Logger";
import errorHandler from "./middleware/errorHandler";
import requestLogger from "./middleware/requestLogger";
import router from "./routes";
import { NotFoundError } from "./core/ApiError";
import "dotenv/config";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

const app = express();

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

// Request logger middleware should be after body parsing
app.use(requestLogger);

app.use("/api", router);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// @ts-ignore
app.use(errorHandler);

export default app;
