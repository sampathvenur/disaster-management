const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource'); // Assuming you already have a Resource model

// GET all resources
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new resource
router.post('/', async (req, res) => {
    const resource = new Resource({
        name: req.body.name,
        type: req.body.type,
        quantity: req.body.quantity
    });
    
    try {
        const newResource = await resource.save();
        res.status(201).json(newResource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
