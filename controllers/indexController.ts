import { type Request, type Response, type NextFunction } from "express";
import asyncHandler from "express-async-handler";
import db from "../db/pool";
import {DateTime} from "luxon"

const rootGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {rows: messages} = await db.query('SELECT * FROM messages LIMIT 10');
  console.log(`before mutating, typeof ${typeof messages[0].createdat} `, messages);
  messages.forEach(message => {
    message.createdat = DateTime.fromJSDate(message.createdat).toLocaleString(DateTime.DATETIME_MED);
  })
  console.log(messages);
  res.render("index", { title: "Message App", messages});
})
const newGet = (req: Request, res: Response, next: NextFunction) => {
  res.render("form", { title: "New Message" });
}
const newPost = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Name: ${req.body.name} message: ${req.body.message}`);
  const messages = [];
  messages.push({
    text: req.body.message,
    user: req.body.name,
    added: new Date(),
  });
  res.redirect("/");
}
export default {
  rootGet,newGet,newPost
};
