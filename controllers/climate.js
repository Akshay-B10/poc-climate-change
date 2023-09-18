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

exports.getAll = async (req, res) => {
    try {
        const data = await ClimateData.find();
        if (data.length == 0) {
            throw ({ message: "No data found!" });
        }
        res.json(data); // Data: Array of objects (documents)
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.getByArea = async (req, res) => {
    try {
        const areaCode = req.query.area_code;
        if (areaCode < 100 || areaCode > 1000) {
            // Area code outside range
            throw ({ message: "Invalid area code" });
        }
        const data = await ClimateData.find({
            area_code: Number(areaCode)
        });
        if (data.length === 0) {
            throw ({ message: "No data found for given area code" });
        }
        res.json(data); // Data: Array of objects (documents)
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.getByClimateAndArea = async (req, res) => {
    try {
        const { area_code, climate } = req.query;
        if (area_code < 100 || area_code > 1000) {
            // Area code outside range
            throw ({ message: "Invalid area code" });
        }
        const validClimate = ["hot", "humid", "rainy", "cold"];
        if (!validClimate.includes(climate)) {
            throw ({ message: "Invalid climate" });
        }
        const data = await ClimateData.find({
            area_code: Number(area_code),
            climate: climate
        });
        if (data.length === 0) {
            throw ({ message: "No data found for given climate and area code" });
        }
        res.json(data); // Data: Array of Objects (documents)
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.climateChangeAnalysis = async (req, res) => {
    try {
        const { from_climate, to_climate, area_code } = req.body;
        if (area_code < 100 || area_code > 1000) {
            // Area code outside range
            throw ({ message: "Invalid area code" });
        }
        const validClimate = ["hot", "humid", "rainy", "cold"];
        if (!validClimate.includes(from_climate) || !validClimate.includes(to_climate)) {
            throw ({ message: "Invalid 'from climate' or 'to climate'" });
        }
        if (from_climate === to_climate) {
            throw ({ message: "'from climate' and 'to climate' cannot be same" });
        }
        const data = await ClimateData.aggregate([{
            $match: {
                area_code: area_code,
                $or: [{ climate: from_climate }, { climate: to_climate }]
            }
        }, {
            $group: {
                _id: "$climate",                                      // Group by climate to find sum for each climate
                total_temp: { $sum: "$temperature" },                 // Calculate sum of temperature
                total_humidity: { $sum: "$humidity" },                // Calculate sum of humidity
                total_rain_chances: { $sum: "$chances_of_rain" },     // Calculate sum of rain chances
                has_records: { $sum: 1 }                              // Calculate sum of records
            }
        }]);
        if (data.length < 2) {
            // Data cannot be found for at least one specified climate or area.
            throw ({ message: "No data found for specified climate or area" });
        }
        const totalRecords = data[0].has_records + data[1].has_records;
        const climateDelta = from_climate + " -> " + to_climate;
        let toData, fromData;
        if (data[0]._id == from_climate) {
            fromData = data[0];
            toData = data[1];
        } else {
            fromData = data[1];
            toData = data[0];
        }
        const tempDelta = ((toData.total_temp - fromData.total_temp) / totalRecords).toFixed(1);
        const humidityDelta = ((toData.total_humidity - fromData.total_humidity) / totalRecords).toFixed(1);
        const rainChancesDelta = ((toData.total_rain_chances - fromData.total_rain_chances) / totalRecords).toFixed(1);
        const climateChangeIndex = ((tempDelta * humidityDelta) / rainChancesDelta).toFixed(1);
        res.json({
            climate_delta: climateDelta,
            temperature_delta: tempDelta,
            humidity_delta: humidityDelta,
            rain_chances_delta: rainChancesDelta,
            climate_change_index: climateChangeIndex
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};