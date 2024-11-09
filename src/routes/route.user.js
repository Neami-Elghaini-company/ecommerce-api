const express = require("express");
const router = express.Router();
const usersController = require("../controllers/controller.user");

router.route("/").get(usersController.getAllUsers);
router.route("/:id").get(usersController.getUser);
router.route("/:id").post(usersController.deleteUser);
router.route("/:id").patch(usersController.updateUser);
router.route("/login").post(usersController.login);
router.route("/register").post(usersController.register);

module.exports = router;
