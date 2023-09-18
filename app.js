require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const climateRoutes = require("./routes/climate");

const app = express();

app.use(bodyParser.json());

app.use(climateRoutes);

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        app.listen(Number(process.env.PORT));
    })
    .catch(() => console.log(err));