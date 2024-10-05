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


//appointment management
const appointmentRequestRouter = require("./routes/routes_apm_appointment_request.js");
app.use("/appointmentrequest", appointmentRequestRouter);

const appointmentRouter = require("./routes/routes_apm_appointment.js");
app.use("/appointment", appointmentRouter);


//users - attorney management
const appointmentManagerRouter = require("./routes/routes_atm_user_appointment_manager.js");
app.use("/appointmentmanager", appointmentManagerRouter);

const legalCaseManagerRouter = require("./routes/routes_atm_user_legal_case_manager.js");
app.use("/legalcasemanager", legalCaseManagerRouter);

const deedManagerRouter = require("./routes/routes_atm_user_deed_manager.js");
app.use("/deedmanager", deedManagerRouter);


//client
const clientRouter = require("./routes/routes_cli_clients.js");
app.use("/client", clientRouter);