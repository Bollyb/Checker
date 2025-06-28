import dbConnect from '../lib/db';
import Brand from '../models/Brand';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, walletAddress, logoUrl } = req.body;
    let brand = await Brand.findOne({ walletAddress });
    if (!brand) brand = await Brand.create({ name, walletAddress, logoUrl });
    return res.status(200).json(brand);
  }

  if (req.method === 'GET') {
    const brands = await Brand.find();
    return res.status(200).json(brands);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
