import express from "express";
import cors from 'cors';
import { configDotenv } from "dotenv";

import { connect } from "./data/database/config.js";

import CartGateway from "./api/Cart.js";
import OrderGateway from "./api/Order.js";

configDotenv();
connect();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

CartGateway(app);
OrderGateway(app);


app.listen(process.env.PORT || 8002, () => { console.log('Running on port :', process.env.PORT) });
