const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

router.get('/', async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const report = new Report({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        severity: req.body.severity
    });

    try {
        const newReport = await report.save();
        res.status(201).json(newReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
