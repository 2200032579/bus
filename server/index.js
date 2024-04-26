const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;

const cityRouter = require("./src/controllers/city.controller");
const busRouter = require("./src/controllers/bus.controller");
const userRouter = require("./src/controllers/user.controller");
const orderRouter = require("./src/controllers/order.controller");
const paymentController = require('./src/controllers/payment.controller');

const connect = require("./src/configs/db");

// Define CORS options to allow requests from localhost:3000
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/user", userRouter);
app.use("/city", cityRouter);
app.use("/bus", busRouter);
app.use("/order", orderRouter);
app.use("/api/payment", paymentController);

app.listen(port, async () => {
  try {
    await connect();
    console.log("Connected to MongoDB database");
    console.log(`Listening on http://localhost:${port}`);
  } catch (error) {
    console.log("Failed to connect to MongoDB database:", error.message);
  }
});
