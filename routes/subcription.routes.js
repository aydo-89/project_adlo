const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const SubscriptionController = require("../controllers/subscription.controller");

router.get("/", [authJwt.verifyToken, authJwt.isAdmin], SubscriptionController.getAllSubscriptions);
router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], SubscriptionController.getSubscriptionById);
router.post("/", authJwt.verifyToken, SubscriptionController.createSubscription);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], SubscriptionController.updateSubscription);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], SubscriptionController.deleteSubscription);

module.exports = router;
