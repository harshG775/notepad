import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import userAuthRouter from "../routes/userAuth.router.js";
import notesRouter from "../routes/notes.router.js";
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// routers
app.use("/api/v1/users/auth", userAuthRouter);
app.use("/api/v1/users/notes", notesRouter);

export default app;
