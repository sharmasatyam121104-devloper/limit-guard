import { ErrorRequestHandler } from "express";

interface AppError extends Error {
  statusCode?: number;
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const isDev = process.env.NODE_ENV === "development";

  const err = error as AppError;

  const statusCode = err.statusCode ?? 500;

  const response: {
    success: boolean;
    status: number;
    message: string;
    stack?: string[];
    location?: string;
  } = {
    success: false,
    status: statusCode,
    message: err.message || "Internal Server Error",
  };

  if (isDev && err.stack) {
    const stackLines = err.stack
      .split("\n")
      .map((line) => line.trim())
      .filter((line) =>line && !line.includes("node_modules"));

    response.stack = stackLines;

    //helper files ignore karo
    const ignoreFiles = [
      "createError.ts",
      "asyncHandler.ts",
      "errorHandler.ts",
    ];

    const locationLine =stackLines.find((line) =>
          line.startsWith("at") &&
          !ignoreFiles.some((file) => line.includes(file))
      ) || stackLines[1] || "";

    const match =locationLine.match(/\((.*)\)/) || locationLine.match(/at (.*)/);

    response.location = match?.[1];
  }

  res.status(statusCode).json(response);
};

export default errorHandler;