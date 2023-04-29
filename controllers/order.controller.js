const db = require("../middlewares");
const Order = db.order;
const User = db.user;
const Ingredient = db.ingredient;

// Create a new order
exports.createOrder = (req, res) => {
  // Retrieve user and ingredient IDs from the request body
  const { userId, ingredientId } = req.body;

  // Create a new order
  const order = new Order({
    user: userId,
    ingredient: ingredientId
  });

  // Save the order to the database
  order.save((err, order) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    // Populate the order with user and ingredient details
    order.populate("user", "-__v -password").populate("ingredient", "-__v", (err, order) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      res.send(order);
    });
  });
};

// Get all orders
exports.getAllOrders = (req, res) => {
  // Find all orders in the database
  Order.find({})
    .populate("user", "-__v -password")
    .populate("ingredient", "-__v")
    .exec((err, orders) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      res.send(orders);
    });
};

// Get a single order by ID
exports.getOrderById = (req, res) => {
  const { id } = req.params;

  // Find the order by ID in the database
  Order.findById(id)
    .populate("user", "-__v -password")
    .populate("ingredient", "-__v")
    .exec((err, order) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (!order) {
        return res.status(404).send({ message: "Order not found." });
      }

      res.send(order);
    });
};

// Delete an order by ID
exports.deleteOrder = (req, res) => {
  const { id } = req.params;

  // Find the order by ID in the database and remove it
  Order.findByIdAndRemove(id, { useFindAndModify: false }, (err, order) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!order) {
      return res.status(404).send({ message: "Order not found." });
    }

    res.send({ message: "Order was deleted successfully!" });
  });
};
