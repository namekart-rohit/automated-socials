import { Request, Response, NextFunction } from "express";
import Logger from "../core/Logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Log the incoming request details
  Logger.info(`Incoming Request: ${req.method} ${req.originalUrl} - ${req.ip}`);
  Logger.info(`Request Body: ${JSON.stringify(req.body)}`);

  // Capture the original send method
  const originalSend = res.send;

  // Override the send method to log the response body
  res.send = function (body) {
    Logger.info(`Response Body: ${body}`);
    return originalSend.call(this, body);
  };

  // Listen for the response to finish
  res.on("finish", () => {
    Logger.info(
      `Response: ${res.statusCode} ${req.method} ${req.originalUrl} - ${req.ip}`
    );
  });

  next();
};

export default requestLogger;
