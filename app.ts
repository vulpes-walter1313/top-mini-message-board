import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import http from "http";
import { type ErrorWithStatus } from "./types/types";

import indexRouter from "./routes/index";

const app = express();

// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./public"));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error: ErrorWithStatus = new Error("page not found");
  error.status = 404;
  next(error);
});

// error handler
app.use(function (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app);
const port = parseInt(process.env.PORT || "3000");
app.set("port", port);

// 404 catch all
app.all("*", (req, res, next) => {
  const error: ErrorWithStatus = new Error("This resource does not exist");
  error.status = 404;
  next(error);
});
// Error handling middleware
app.use(
  (
    err: ErrorWithStatus,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    console.error(err);
    err.message = err.message ?? "Unexpected Error occured";
    res.status(err.status ?? 500).json({
      success: false,
      error: {
        message: err.toString(),
        status: err.status ?? 500,
      },
    });
  },
);

server.listen(port);
server.on("error", (error) => {
  //@ts-ignore
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  // @ts-ignore
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});
