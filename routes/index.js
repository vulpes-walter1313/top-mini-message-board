var express = require("express");
var router = express.Router();

const messages = [
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
router
  .route("/new")
  .get(function (req, res, next) {
    res.render("form", { title: "New Message", messages });
  })
  .post(function (req, res) {
    console.log(`Name: ${req.body.name} message: ${req.body.message}`)
    messages.push({
      text: req.body.message,
      user: req.body.name,
      added: new Date(),
    });
    res.redirect("/");
  });

module.exports = router;
