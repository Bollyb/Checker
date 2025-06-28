const express = require('express');
const router = express.Router();
const User = require('C:\Users\HP\OneDrive\Desktop\skyline\Backend\models\User');

// Create or find a user
router.post('/register', async (req, res) => {
  const { walletAddress } = req.body;
  try {
    let user = await User.findOne({ walletAddress });
    if (!user) {
      user = new User({ walletAddress });
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user points
router.get('/:walletAddress', async (req, res) => {
  try {
    const user = await User.findOne({ walletAddress: req.params.walletAddress });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ points: user.points, redeemed: user.redeemed });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update points (add or redeem)
router.put('/update', async (req, res) => {
  const { walletAddress, points, action } = req.body;
  try {
    const user = await User.findOne({ walletAddress });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (action === 'add') {
      user.points += points;
    } else if (action === 'redeem') {
      if (user.points < points) return res.status(400).json({ error: 'Insufficient points' });
      user.points -= points;
      user.redeemed += points;
    }
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
