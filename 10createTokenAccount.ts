import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { generateKeypair }  from './2secretkey2publickey'
import { tokenMint } from "./7createTokenMintAddress";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";
import { setEnvValue } from "./6updateEnv";
require('dotenv').config()


const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed"
});

const user = generateKeypair();

const mintAccount = process.env.MINT_PUBLIC_KEY;
const tokenMintAccount = new PublicKey(mintAccount);

const recipient = user.publicKey;

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient
);

setEnvValue('TOKEN_ACCOUNT', tokenAccount.address.toBase58())

// console.log(`Token Account: ${tokenAccount.address.toBase58()}`)

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
);

console.log(`✅ Created token Account: ${link}`);

// ✅ Created token Account: https://explorer.solana.com/address/9eqFZ4ryY5ksu7Bjrv1BJKEfAZX53aukH6nb1m5myBk1?cluster=devnet
// It is important to set commit is confirmed in creating Connection