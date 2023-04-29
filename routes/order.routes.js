const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const OrderController = require("../controllers/order.controller");

router.get("/", authJwt.verifyToken, OrderController.getAllOrders);
router.get("/:id", authJwt.verifyToken, OrderController.getOrderById);
router.post("/", authJwt.verifyToken, OrderController.createOrder);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], OrderController.updateOrder);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], OrderController.deleteOrder);

module.exports = router;

