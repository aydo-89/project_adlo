const db = require("../middlewares");
const Transaction = db.transaction;

exports.createTransaction = (req, res) => {
  // Validate request
  if (!req.body.amount || !req.body.userId) {
    res.status(400).send({ message: "Amount and userId cannot be empty!" });
    return;
  }

  // Create a Transaction
  const transaction = {
    amount: req.body.amount,
    userId: req.body.userId,
  };

  // Save Transaction in the database
  Transaction.create(transaction)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction.",
      });
    });
};

exports.getAllTransactions = (req, res) => {
  Transaction.findAll({ include: ["user"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    });
};
