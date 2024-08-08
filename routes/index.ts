import express from "express";
import indexController from "../controllers/indexController";
const router = express.Router();

export const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Message Board", messages });
});

// GET new message form
router.get("/new", indexController.NEW_GET);
router.post("/new", indexController.NEW_POST);

export default router;
