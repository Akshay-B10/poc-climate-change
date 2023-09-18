const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const climateData = new Schema({
    climate: {
        type: String,
        enum: ["hot", "humid", "rainy", "cold"],
        required: true
    },
    area_code: {
        type: Number,
        min: 100,
        max: 1000,
        validate: {
            validator: Number.isInteger,
            message: "Invalid Area Code",
        },
        required: true
    },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    chances_of_rain: { type: Number, required: true },
    created_at: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("ClimateData", climateData);