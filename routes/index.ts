import express from "express";
import indexController from "../controllers/indexController";
const router = express.Router();

/* GET home page. */
router.get("/", indexController.rootGet);

// GET new message form
router.get("/new", indexController.newGet);
router.post("/new", indexController.newPost);

export default router;
