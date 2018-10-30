const express = require("express"),
  router = express.Router(),
  catRouter = require("./cats"),
  authRouter = require('./auth'),
  { name, version } = require("../package"),
  passport = require("passport");

router.get("/", (req, res, next) => {
  res.status(200).json({
    name,
    version
  });
  next();
});
router.use(
  "/auth",
  authRouter
);
router.use(
  "/cats",
  passport.authenticate("jwt", { session: false }),
  catRouter
);

module.exports = router;
