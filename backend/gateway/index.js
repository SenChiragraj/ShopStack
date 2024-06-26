const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/order", proxy("http://127.0.0.1:8003")); // orders, carts
app.use("/product", proxy("http://127.0.0.1:8002")); // products
app.use("/", proxy("http://127.0.0.1:8001")); // auth, user info

app.get('/', (req, res) => {
  return res.status(201).json({message : 'Site is healthy👍'})
})

app.listen(8000, () => {
  console.log("Gateway is Listening to Port 8000");
});