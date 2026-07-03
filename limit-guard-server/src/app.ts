import express from "express";
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get(
  "/success",
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: "Everything is working",
    });
  })
);

/*
====================================
TEST 2 - Custom Error
====================================
*/

app.get(
  "/custom-error",
  asyncHandler(async (req, res) => {
    throw createError(404, "User not found");
  })
);

/*
====================================
TEST 3 - Normal Error
====================================
*/

app.get(
  "/normal-error",
  asyncHandler(async (req, res) => {
    throw new Error("Database Connection Failed");
  })
);


import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
import asyncHandler from "./middleware/asyncHandler";
import createError from "./utils/createError";

app.use(notFound);
app.use(errorHandler);


export default app;