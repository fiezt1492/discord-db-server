const router = require("express").Router();

router.get("/", (req, res, next) => {
  if (req.user) {
    console.log("Logging out");
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      return res.sendStatus(200);
    });
  } else return res.sendStatus(404);
});

module.exports = router;
