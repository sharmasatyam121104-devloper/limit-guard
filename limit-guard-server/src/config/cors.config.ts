import cors from "cors";

export const corsOptions = cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
});