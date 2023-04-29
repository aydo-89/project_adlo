const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const IngredientController = require("../controllers/ingredient.controller");

router.get("/", authJwt.verifyToken, IngredientController.getAllIngredients);
router.get("/:id", authJwt.verifyToken, IngredientController.getIngredientById);
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], IngredientController.createIngredient);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], IngredientController.updateIngredient);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], IngredientController.deleteIngredient);

module.exports = router;
