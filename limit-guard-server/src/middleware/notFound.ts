import { RequestHandler } from "express";
import createError from "../utils/createError";

const notFound: RequestHandler = (req, res, next) => {
  next(createError(404, `Route ${req.originalUrl} not found`));
};

export default notFound;