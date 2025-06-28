let contract;
let userAccount;

const contractAddress = "0x2b149B8a89A0884dd35B5AF0Fc68b2296f01Bd47";

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
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" }
    ],
    "name": "getPoints",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "points",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "redeemPoints",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function connectWallet() {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    userAccount = accounts[0];
    console.log("🔌 Connected wallet:", userAccount);

    const web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("✅ Contract connected:", contract.options.address);
  } else {
    alert("🦊 Please install MetaMask to use this app.");
  }
}

async function getMyPoints() {
  try {
    const points = await contract.methods.getPoints(userAccount).call();
    alert(`🎯 You have ${points} loyalty points.`);
  } catch (error) {
    console.error(error);
    alert("❌ Could not fetch your points.");
  }
}

async function addPoints() {
  const address = document.getElementById("addUser").value;
  const amount = document.getElementById("addAmount").value;

  if (!address || !amount) {
    alert("❗ Please enter both address and amount");
    return;
  }

  try {
    await contract.methods.addPoints(address, amount).send({ from: userAccount });
    alert(`✅ Successfully added ${amount} points to ${address}`);
  } catch (error) {
    console.error(error);
    alert("❌ Failed to add points.");
  }
}

async function redeemPoints() {
  const amount = document.getElementById("redeemAmount").value;

  if (!amount) {
    alert("❗ Please enter amount to redeem");
    return;
  }

  try {
    await contract.methods.redeemPoints(amount).send({ from: userAccount });
    alert(`✅ Successfully redeemed ${amount} points.`);
  } catch (error) {
    console.error(error);
    alert("❌ Failed to redeem points.");
  }
}

window.onload = connectWallet;