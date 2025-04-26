const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// GET /incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /incidents
router.post('/', async (req, res) => {
  try {
    const { title, description, severity } = req.body;
    if (!title || !description || !severity) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const incident = new Incident({ title, description, severity });
    const savedIncident = await incident.save();
    res.status(201).json(savedIncident);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /incidents/:id
router.get('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /incidents/:id
router.delete('/:id', async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }
    res.status(200).json({message:'Deleted successfully'});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
