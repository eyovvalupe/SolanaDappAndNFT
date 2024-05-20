import { Keypair, Transaction, SystemProgram, Connection, PublicKey } from "@solana/web3.js";

import { getMint } from "@solana/spl-token";
require('dotenv').config()

// connection
const connection = new Connection("https://api.devnet.solana.com");

const mintPubkeyFenv = process.env.MINT_PUBLIC_KEY

const mintPubkey = new PublicKey(mintPubkeyFenv);

console.log(mintPubkey);

// // fetch mint info

// // you can get mint informations by a mint address

(async () => {
  let mint = await getMint(connection, mintPubkey);
  console.log( mint );
})();
