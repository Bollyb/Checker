const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');

// Register brand
router.post('/register', async (req, res) => {
  const { name, walletAddress, logoUrl } = req.body;
  try {
    let brand = await Brand.findOne({ walletAddress });
    if (!brand) {
      brand = new Brand({ name, walletAddress, logoUrl });
      await brand.save();
    }
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
