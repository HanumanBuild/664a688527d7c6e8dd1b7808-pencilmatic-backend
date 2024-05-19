const express = require('express');
const router = express.Router();
const Drawing = require('../models/Drawing');
const auth = require('../middleware/auth');

// Save a drawing
router.post('/save', auth, async (req, res) => {
    const { drawingData } = req.body;

    const drawing = new Drawing({
        userId: req.user._id,
        drawingData
    });

    try {
        const savedDrawing = await drawing.save();
        res.send(savedDrawing);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all drawings for a user
router.get('/all', auth, async (req, res) => {
    try {
        const drawings = await Drawing.find({ userId: req.user._id });
        res.send(drawings);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;