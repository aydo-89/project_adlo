const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const ingredientRouter = require('./routes/ingredient.routes');
const orderRouter = require('./routes/order.routes');
const subscriptionRouter = require('./routes/subscription.routes');
const transactionRouter = require('./routes/transaction.routes');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/ingredients', ingredientRouter);
app.use('/orders', orderRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/transactions', transactionRouter);

// Other middleware and routes...
