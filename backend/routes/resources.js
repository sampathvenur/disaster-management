const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Get all resources
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new resource
router.post('/', async (req, res) => {
    const resource = new Resource({
        name: req.body.name,
        quantity: req.body.quantity,
        location: req.body.location,
        type: req.body.type
    });

    try {
        const newResource = await resource.save();
        res.status(201).json(newResource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
