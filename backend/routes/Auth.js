const { Signup, Login } = require("../middleware/AuthController");
const router = require("express").Router();
const {UserVerification} = require("../middleware/AuthVerification")

router.post("/signup", Signup);
router.post("/login", Login)
router.post("/", UserVerification)

module.exports = router;
