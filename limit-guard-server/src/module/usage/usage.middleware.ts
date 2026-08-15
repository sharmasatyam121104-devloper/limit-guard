import { NextFunction, Response } from "express";
import { SessionInterface } from "../user/user.interface";
import { usageData } from "./usage.service";

export const usageLogger = (
  req: SessionInterface,
  res: Response,
  next: NextFunction
) => {
  const startTime = res.locals.requestStartTime;

  res.on("finish", async () => {
    try {
      const latency = Date.now() - startTime;

      await usageData(req.userId!, {
        endpointName: req.originalUrl,
        status: res.statusCode >= 400 ? "Failed" : "Success",
        statusCode: res.statusCode,
        latency,
      });
    } catch (error) {
      console.error("Usage logging failed:", error);
    }
  });

  next();
};