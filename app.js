const fs = require("fs").promises;

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const ClimateData = require("./models/climate-data");

const climateRoutes = require("./routes/climate");

const app = express();

app.use(bodyParser.json());

app.use(climateRoutes);

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        try {
            const data = await ClimateData.find();
            let jsonData;
            if (data.length == 0) {
                // Read file and get in json form
                // Data to insert in database for testing
                jsonData = await fs.readFile("test-data.json", "utf8");
            }
            if (jsonData) {
                const parsedData = JSON.parse(jsonData);
                await ClimateData.insertMany(parsedData);
            }
            console.log("Server is running now!");
            app.listen(Number(process.env.PORT));
        } catch (err) {
            throw (err);
        }
    })
    .catch(err => console.log(err));
