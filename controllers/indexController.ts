import { type Request, type Response, type NextFunction } from "express";
import asyncHandler from "express-async-handler";
import db from "../db/pool";
import { DateTime } from "luxon";
import { body, matchedData, validationResult } from "express-validator";
import he from "he";

const rootGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rows: messages } = await db.query(
      "SELECT * FROM messages LIMIT 10",
    );
    messages.forEach((message) => {
      message.username = he.decode(message.username);
      message.text = he.decode(message.text);
      message.createdat = DateTime.fromJSDate(message.createdat).toLocaleString(
        DateTime.DATETIME_MED,
      );
    });
    res.render("index", { title: "Message App", messages });
  },
);
const newGet = (req: Request, res: Response, next: NextFunction) => {
  res.render("form", { title: "New Message", errors: undefined });
};
const newPost = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("name has to be between 1 and 30 characters")
    .escape(),
  body("message")
    .trim()
    .isLength({ min: 1, max: 512 })
    .withMessage("message has to be between 1 and 512 characters")
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const valResult = validationResult(req);
    if (!valResult.isEmpty()) {
      const errors = valResult.array();
      res.status(400).render("form", { title: "New Message", errors });
    } else {
      const data = matchedData(req);
      await db.query("INSERT INTO messages(username, text) VALUES ($1, $2)", [
        data.name,
        data.message,
      ]);
      res.redirect("/");
    }
  }),
];
export default {
  rootGet,
  newGet,
  newPost,
};
