const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const TransactionController = require("../controllers/transaction.controller");

router.get("/", [authJwt.verifyToken, authJwt.isAdmin], TransactionController.getAllTransactions);
router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], TransactionController.getTransactionById);
router.post("/", authJwt.verifyToken, TransactionController.createTransaction);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], TransactionController.updateTransaction);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], TransactionController.deleteTransaction);

module.exports = router;
