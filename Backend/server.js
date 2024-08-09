// created by : R.M.S.D. Rathnayake - IT22140616

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

// port number
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

// database link
const URL = process.env.MONGODB_URL;

// connect to mongoDB
mongoose.connect(URL);

// opening connection
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!!..");
});

// runnung on port
app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`);
});
