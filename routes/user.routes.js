const express = require("express");
const router = express.Router();
const authJwt = require("../middlewares/authJwt"); // Import authJwt module

const UserController = require("../controllers/user.controller");

// Define API endpoints using the router
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], UserController.getAllUsers);
router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], UserController.getUserById);
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], UserController.createUser);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], UserController.updateUser);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], UserController.deleteUser);

module.exports = router;
