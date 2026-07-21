import { NextFunction, Response } from "express";
import { SessionInterface } from "../user/user.interface";
import { logActivity } from "./activity.service";

const activityMiddleware = (req: SessionInterface, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    if (!req.userId) return;

    logActivity({
      userId: req.userId,
      type: "API Request",
      message: `${req.method} ${req.originalUrl}`,
      status: res.statusCode < 400 ? "success" : "failed",
    })
    .catch(console.error);
  });

  next();
};

export default activityMiddleware;