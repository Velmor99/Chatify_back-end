const { Router } = require("express");
const userController = require("./user.controller");
const router = Router();

router.post("/register", userController.register);
router.put("/login", userController.login);

module.exports = router;
