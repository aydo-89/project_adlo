const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require(".");
const userRoutes = require("../routes/user.routes");
const ingredientRoutes = require("../routes/ingredient.routes");
const orderRoutes = require("../routes/order.routes");
const subscriptionRoutes = require("./routes/subscription.routes");
const transactionRoutes = require("./routes/transaction.routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Define the base URL for each API endpoint
app.use("/api/users", userRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

