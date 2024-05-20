import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { generateKeypair } from "./2secretkey2publickey";
import { getExplorerLink } from "@solana-developers/helpers";
import { mintTo } from "@solana/spl-token";
require('dotenv').config()

const connection = new Connection(clusterApiUrl("devnet"));

const MINOR_UNITS_PER_MAJOR_UINTS = Math.pow(10, 2);

const user = generateKeypair();

const mintAccount = process.env.MINT_PUBLIC_KEY

const tokenMintAccount = new PublicKey(mintAccount);

const RECIPIENT_TOKEN_ACCOUNT = process.env.TOKEN_ACCOUNT;

const recipientAssociatedTokenAccount = new PublicKey(RECIPIENT_TOKEN_ACCOUNT);

const transactionSignature = await mintTo (
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    10 * MINOR_UNITS_PER_MAJOR_UINTS
);

const link = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet"
)

console.log(`✅ Success! Mint Token Transaction: ${link}`);