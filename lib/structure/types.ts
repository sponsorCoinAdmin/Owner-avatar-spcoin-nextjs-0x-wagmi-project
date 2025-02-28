import { Account, Address } from "viem";

export const publicWalletPath: string = "assets/wallets";

export interface WalletAddress {
    address: string;
}

interface BlockScanner {
    chainId: number
    explorer?: string;
    url?: string;
}

// Define Wallet type
interface WalletAccount {
    name: string;
    symbol: string;
    type: string;
    website: string;
    description: string;
    status: string;
    address: string;
    "block-scanners": BlockScanner[];
    avatar:string;
}

// Button Types
enum BUTTON_TYPE {
  API_TRANSACTION_ERROR,
  BUY_ERROR_REQUIRED,
  BUY_TOKEN_REQUIRED,
  CONNECT,
  INSUFFICIENT_BALANCE,
  IS_LOADING_PRICE,
  NO_HARDHAT_API,
  SELL_ERROR_REQUIRED,
  SELL_TOKEN_REQUIRED,
  SWAP,
  TOKENS_REQUIRED,
  UNDEFINED,
  ZERO_AMOUNT
}

// Container Types
enum CONTAINER_TYPE {
  INPUT_SELL_PRICE,
  INPUT_BUY_PRICE
}

// Exchange States
enum EXCHANGE_STATE {
  APPROVE,
  INSUFFICIENT_BALANCE,
  MISSING_SELL_AMOUNT,
  NOT_CONNECTED,
  PENDING,
  SWAP
}

// Feed Types
enum FEED_TYPE {
  AGENT_WALLETS,
  RECIPIENT_WALLETS,
  TOKEN_LIST
}

// SP Coin Display
enum SP_COIN_DISPLAY {
  RECIPIENT_CONTAINER,
  SELECT_BUTTON,
  SPONSOR_RATE_CONFIG
}

// Status Types
enum STATUS {
  ERROR_API_PRICE,
  SUCCESS,
  WARNING_HARDHAT
}

// Swap Types
enum SWAP_TYPE {
  SWAP,
  SWAP_UNWRAP,
  UNDEFINED,
  UNWRAP,
  WRAP,
  WRAP_SWAP
}

// Transaction Types
enum TRANSACTION_TYPE {
  BUY_EXACT_IN,
  SELL_EXACT_OUT
}

// Network Constants
const ETHEREUM = 1;
const BASE = 8453;
const HARDHAT = 31337;
const POLYGON = 137;
const SEPOLIA = 11155111;

// Network WETH Addresses
const BASE_WETH_ADDRESS: Address = "0x4200000000000000000000000000000000000006";
const ETHEREUM_WETH_ADDRESS: Address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const HARDHAT_WETH_ADDRESS: Address = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const POLYGON_WETH_ADDRESS: Address = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619";
const SEPOLIA_WETH_ADDRESS: Address = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";

// Interfaces and Types
interface PriceRequestParams {
  buyAmount: string;
  buyToken: Address | string;
  connectedAccountAddr?: string;
  sellAmount: string;
  sellToken: Address | string;
}

type ContractRecs = {
  decimalRec: any;
  nameRec: any;
  symbolRec: any;
  totalSupplyRec: any;
};

type ErrorMessage = {
  errCode: number;
  msg: any;
  source: string;
  status: STATUS;
};

type ExchangeContext = {
  activeAccountAddress: `0x${string}` | Account | Address | undefined;
  agentAccount?: WalletAccount;
  network: NetworkElement;
  recipientWallet?: WalletAccount;
  spCoinPanels: SP_COIN_DISPLAY;
  test: { dumpContextButton: boolean };
  tradeData: TradeData;
};

type NetworkElement = {
  readonly chainId: number;
  readonly img: string;
  readonly name: string;
  readonly symbol: string;
  readonly url: string;
};

type TokenContract = {
  address: Address;
  balance: bigint;
  chainId?: number;
  decimals?: number;
  img?: any;
  name?: string;
  symbol?: string;
  totalSupply: any;
};

type TradeData = {
  buyAmount: bigint;
  buyTokenContract?: TokenContract;
  chainId: number;
  sellAmount: bigint;
  sellTokenContract?: TokenContract;
  signer: any;
  slippageBps: number;
  swapType: SWAP_TYPE;
  transactionType: TRANSACTION_TYPE;
};

// Exports
export {
  BUTTON_TYPE,
  CONTAINER_TYPE,
  EXCHANGE_STATE,
  FEED_TYPE,
  SP_COIN_DISPLAY,
  STATUS,
  SWAP_TYPE,
  TRANSACTION_TYPE,
  BASE,
  ETHEREUM,
  HARDHAT,
  POLYGON,
  SEPOLIA,
  BASE_WETH_ADDRESS,
  ETHEREUM_WETH_ADDRESS,
  HARDHAT_WETH_ADDRESS,
  POLYGON_WETH_ADDRESS,
  SEPOLIA_WETH_ADDRESS
};

export type {
  WalletAccount,
  ContractRecs,
  ErrorMessage,
  ExchangeContext,
  NetworkElement,
  PriceRequestParams,
  TokenContract,
  TradeData
};
