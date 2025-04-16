

const cityModel = require('../models/CityModel');

const addCity = async (req, res) => {
    try {
        const savedCity = await cityModel.create(req.body);
        res.status(201).json({
            message: "City added successfully",
            data: savedCity,
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

const getCities = async (req, res) => {
    try {
        const cities = await cityModel.find();
        res.status(200).json({
            message: "All cities fetched successfully",
            data: cities
        })

    } catch (err) {

        res.status(500).json({message: err});

    }
};

const getCityByStateId = async (req, res) => {
    try {
        const city = await cityModel.findById(req.params.id);
        res.status(200).json({
            message: "City fetched successfully",
            data: city
        })

    } catch (err) {

        res.status(500).json({
            message: err
        });

    }
};

module.exports = { addCity, getCities, getCityByStateId};