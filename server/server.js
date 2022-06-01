const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const companyRouter = require("./routes/companyRouter");
const productRouter = require("./routes/productRouter");
const clientRouter = require("./routes/clientRouter");
const orderRouter = require("./routes/orderRouter");
require("dotenv").config();

app.use(cors());
app.use("/", express.json());
app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/product", productRouter)
app.use("/client", clientRouter)
app.use("/order", orderRouter)
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
