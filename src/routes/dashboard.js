const router = require("express").Router();

router.get("/", isAuthorized, (req, res) => {
  res.send(req.user);
});

router.get("/settings", (req, res) => {
  res.send(200);
});

function isAuthorized(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = router;
