const { Router } = require("express");
const passport = require("passport");
const controller = require("../controllers/authController");

const router = Router();

router.get("/sign-up", controller.getSignup);
router.post("/sign-up", controller.postSignup);

router.post("/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

router.get("/log-out", controller.logout);

module.exports = router;