const express = require('express');
const router = express.Router();
const SOS = require('../models/sos');

router.post('/', async (req, res) => {
  const { message } = req.body;
  try {
    const sos = new SOS({ message });
    await sos.save();
    res.status(201).json(sos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
