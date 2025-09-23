const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

console.log("--User Routes Working--");

router.post("/", userController.createUser);

// router.get("/", authMiddleware, userController.getAllUsers);

router.get("/", userController.getAllUsers);
router.post("/login", userController.getUser);

router.delete("/:id", userController.deleteUser);

router.put("/:id", userController.updateUser);

module.exports = router;
