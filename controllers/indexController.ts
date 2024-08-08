import { type Request, type Response, type NextFunction } from "express";
import { messages } from "../routes";

function NEW_GET(req: Request, res: Response, next: NextFunction) {
  res.render("form", { title: "New Message", messages });
}
function NEW_POST(req: Request, res: Response, next: NextFunction) {
  console.log(`Name: ${req.body.name} message: ${req.body.message}`);
  messages.push({
    text: req.body.message,
    user: req.body.name,
    added: new Date(),
  });
  res.redirect("/");
}
export default {
  NEW_GET,
  NEW_POST,
};
