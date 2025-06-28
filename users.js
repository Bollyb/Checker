import dbConnect from '../lib/db';
import User from 'C:\Users\HP\OneDrive\Desktop\skyline\Backend\models\User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { walletAddress } = req.body;
    let user = await User.findOne({ walletAddress });
    if (!user) user = await User.create({ walletAddress });
    return res.status(200).json(user);
  }

  if (req.method === 'GET') {
    const { walletAddress } = req.query;
    const user = await User.findOne({ walletAddress });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
