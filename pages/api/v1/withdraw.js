const Web3 = require("web3");
import fetch from "node-fetch";

const contractAddress = "0x98C8f021418D09D48d5021701B8e6886531967B9";

const web3 = new Web3("https://bsc-dataseed.binance.org:443");
const privateKey = process.env.PRIVATE_KEY;

const ABI = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_insurance_address",
        type: "address",
      },
      { internalType: "address payable", name: "_marketing", type: "address" },
      {
        internalType: "address payable",
        name: "_development",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "addr", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "LimitReached",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "addr", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "NewDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "addr", type: "address" },
      { indexed: true, internalType: "address", name: "from", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReferralPayout",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "addr", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "upline",
        type: "address",
      },
    ],
    name: "Upline",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "addr", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "PERCENTS_DIVIDER",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "basic_bonus",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bonus_constant",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractInfo",
    outputs: [
      { internalType: "uint256", name: "_total_users", type: "uint256" },
      { internalType: "uint256", name: "_total_deposited", type: "uint256" },
      { internalType: "uint256", name: "_total_withdrawn", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "plan_index", type: "uint256" },
    ],
    name: "getStakePlanInfo",
    outputs: [
      { internalType: "uint256", name: "bonus_percentage", type: "uint256" },
      { internalType: "uint256", name: "bonus", type: "uint256" },
      { internalType: "uint256", name: "daily_bonus", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "insurance_funds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "insurance_wallet",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_addr", type: "address" },
      { internalType: "uint256", name: "stake_id", type: "uint256" },
    ],
    name: "isStakeActive",
    outputs: [{ internalType: "bool", name: "_status", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "max_deposit_amount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "min_deposit_amount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "min_withdrawal_amount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_addr", type: "address" }],
    name: "payoutOf",
    outputs: [{ internalType: "uint256", name: "payout", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "referral_percents",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "restake_referrals_bonus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_referrer", type: "address" },
      { internalType: "uint256", name: "plan_index", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "staking_plans",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "time_step",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "total_deposited",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "total_users",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "total_withdrawn",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_addr", type: "address" },
      { internalType: "uint256", name: "_stake_id", type: "uint256" },
    ],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "deposit_amount", type: "uint256" },
      { internalType: "uint256", name: "withdrawn_amount", type: "uint256" },
      { internalType: "uint256", name: "bonus", type: "uint256" },
      { internalType: "uint256", name: "daily_bonus", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_addr", type: "address" }],
    name: "userInfoTotals",
    outputs: [
      { internalType: "uint256", name: "referral_bonus", type: "uint256" },
      { internalType: "uint256", name: "total_staked_amount", type: "uint256" },
      {
        internalType: "uint256",
        name: "total_withdrawn_amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_addr", type: "address" }],
    name: "userReferralsInfo",
    outputs: [
      { internalType: "uint256", name: "level1", type: "uint256" },
      { internalType: "uint256", name: "level2", type: "uint256" },
      { internalType: "uint256", name: "level3", type: "uint256" },
      { internalType: "uint256", name: "level4", type: "uint256" },
      { internalType: "uint256", name: "level5", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "users",
    outputs: [
      { internalType: "address", name: "upline", type: "address" },
      { internalType: "uint256", name: "referral_bonus", type: "uint256" },
      { internalType: "uint256", name: "stake_count", type: "uint256" },
      { internalType: "uint256", name: "total_staked", type: "uint256" },
      { internalType: "uint256", name: "total_withdrawn", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw_referrals_bonus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
const contract = new web3.eth.Contract(ABI, contractAddress);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function connectToAccount() {
  const account = await web3.eth.accounts.privateKeyToAccount(privateKey);
  console.log(account);
  return await askForWithdraw(account);
}

async function signAndSend(account, value = 0) {
  try {
    const data = await contract.methods.withdraw().encodeABI();
    const gasPrice = await web3.eth.getGasPrice();
    const options = {
      to: contractAddress,
      data,
      value: value,
      gasPrice: gasPrice,
      gas: 320000,
    };
    console.log(options);
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(contract.options.address),
      "ether"
    );
    const myBalance = web3.utils.fromWei(
      await web3.eth.getBalance(account.address),
      "ether"
    );
    console.log(balance, myBalance);
    if (balance > 10 && myBalance < 5) {
      console.log("Trying to withdraw");
      const signed = await web3.eth.accounts.signTransaction(
        options,
        privateKey
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signed.rawTransaction
      );
      return receipt;
    }
    return "Not available enough money";
  } catch (error) {
    console.log(error.message);
  }
}

async function askForWithdraw(account) {
  try {
    const receipt = await signAndSend(account);
    console.log("TX receipt", receipt);
    return receipt;
  } catch (e) {
    console.log(e);
  }
}

export default async function withdraw(event, res) {
  try {
    if (event.method !== "GET") {
      res.status(401).json({ message: "Invalid Method" });
    }
    const data = await connectToAccount(privateKey);
    res.status(200).json({
      // url: sessionData.url
      data,
    });
  } catch (e) {
    console.log("error------->", e);
    res.status(500).json({ message: e.message });
  }
}
