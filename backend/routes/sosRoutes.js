const express = require('express');
const router = express.Router();
const Sos = require('../models/Sos');

router.post('/', async (req, res) => {
  const { latitude, longitude, city } = req.body;

  console.log('Received SOS request:', req.body);

  if (!latitude || !longitude || !city) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newSos = new Sos({
      latitude,
      longitude,
      city,
    });

    const savedSos = await newSos.save();
    res.status(201).json(savedSos);
    console.log('Saved SOS:', savedSos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    console.error('Error saving SOS:', err);
  }
});

router.get('/', async (req, res) => {
  try {
    const sosReports = await Sos.find().sort({ timestamp: -1 });
    res.status(200).json(sosReports);
    console.log('Fetched SOS reports:', sosReports);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    console.error('Error fetching SOS reports:', err);
  }
});

module.exports = router;
