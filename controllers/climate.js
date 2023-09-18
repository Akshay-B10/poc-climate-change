const ClimateData = require("../models/climate-data");

exports.addClimateData = async (req, res) => {
    try {
        const { climate, area_code, temperature, humidity, chances_of_rain } = req.body;
        const newData = new ClimateData({
            climate: climate,
            area_code: area_code,
            temperature: temperature,
            humidity: humidity,
            chances_of_rain: chances_of_rain
        });
        const result = await newData.save();
        res.json({
            success: true,
            error: null,
            data: {
                id: result._id
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
            data: null
        });
    }
};