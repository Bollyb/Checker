import dbConnect from '../lib/db';
import Web3 from 'web3';
import User from '../models/User';

// ✅ Smart Contract ABI embedded inline
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "addPoints",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getPoints",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "points",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }],
    "name": "redeemPoints",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// ✅ Web3 setup
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);

// ✅ API handler
export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { walletAddress, purchaseAmount } = req.body;

  if (!walletAddress || !purchaseAmount) {
    return res.status(400).json({ error: 'Missing data' });
  }

  // Business rule: 1 point per $10 spent
  const points = Math.floor(purchaseAmount / 10);

  try {
    // Send transaction to blockchain
    const tx = await contract.methods
      .addPoints(walletAddress, points)
      .send({ from: process.env.ADMIN_WALLET, gas: 200000 });

    return res.status(200).json({
      message: 'Points rewarded successfully',
      transactionHash: tx.transactionHash,
      points,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Blockchain error' });
  }
}
