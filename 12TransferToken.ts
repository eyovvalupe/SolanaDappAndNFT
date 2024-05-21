import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { generateKeypair } from "./2secretkey2publickey";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";
require('dotenv').config()

const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed"
})
const sender = generateKeypair();
const recipient = new PublicKey(process.env.RECIPIENT_ADDRESS);
const tokenMintAccount = new PublicKey(process.env.MINT_PUBLIC_KEY);
const MINOR_UINTS_PER_MAJOR_UNITS = Math.pow(10, 2);

const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    sender.publicKey
);

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
);

const signature = await transfer (
    connection,
    sender,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    sender,
    1 * MINOR_UINTS_PER_MAJOR_UNITS
);

const explorerLink = getExplorerLink ("transaction", signature, "devnet");

console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);

// ✅ Transaction confirmed, explorer link is: https://explorer.solana.com/tx/45Kzn1GrWhpY1qsAGUAvqwK8LZPwWJRw87r2E63Ghz6hbWLLhL
// ANmoZdHP2Py8DGuShfbHfN2cZLE2yz844GRofj?cluster=devnet!