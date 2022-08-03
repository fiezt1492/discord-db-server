const router = require("express").Router();
const passport = require("passport");

router.get("/discord", passport.authenticate("discord"));

router.get(
  "/discord/callback",
  passport.authenticate("discord"),
  (req, res) => {
    res.redirect("http://localhost:3000/guilds");
  }
);

router.get("/", (req, res) => {
  req.user ? res.send(req.user) : res.sendStatus(401);
});

module.exports = router;
