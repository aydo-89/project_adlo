const db = require("../middlewares");
const Subscription = db.subscriptions;

exports.createSubscription = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }

  // Create a Subscription
  const subscription = {
    name: req.body.name,
    price: req.body.price,
    frequency: req.body.frequency,
    status: req.body.status ? req.body.status : false,
  };

  // Save Subscription in the database
  Subscription.create(subscription)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Subscription.",
      });
    });
};

exports.getAllSubscriptions = (req, res) => {
  Subscription.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subscriptions.",
      });
    });
};

exports.getSubscriptionById = (req, res) => {
  const id = req.params.id;

  Subscription.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Subscription with id=" + id,
      });
    });
};

exports.updateSubscription = (req, res) => {
  const id = req.params.id;

  Subscription.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Subscription was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Subscription with id=${id}. Maybe Subscription was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Subscription with id=" + id,
      });
    });
};

exports.deleteSubscription = (req, res) => {
  const id = req.params.id;

  Subscription.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Subscription was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Subscription with id=${id}. Maybe Subscription was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Subscription with id=" + id,
      });
    });
};

