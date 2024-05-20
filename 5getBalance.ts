// import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"
// import { getKeypairFromEnvironment } from "@solana-developers/helpers";
// import dotenv from 'dotenv'
// dotenv.config();

// const connection = new Connection(clusterApiUrl("devnet"));
// const connection = new Connection("https://api.devnet.solana.com", "confirmed");
// const publicKey = process.env.SECRET_KEY 
// console.log(publicKey)
// console.log('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN')
// const address = new PublicKey('DxvRGX14xFE6fj7u1AkXGSduXaKBXfgBa6YstVeKqSUg');

// const balance = await connection.getBalance(address);
// const balanceSol = balance/LAMPORTS_PER_SOL;

// console.log(`The balance of the account at ${address} is ${balanceSol} SOL`);
// console.log(`✅ Connected!`)

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const getBalance = async (suppliedPublicKey) => {

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const publicKey = new PublicKey(suppliedPublicKey);

  const balanceInLamports = await connection.getBalance(publicKey);

  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL} SOL!`
  );
}

getBalance("FQAibyvvC1JSMMCUFEfu1eSpJn7JhX4SHbKRB48hRaq5")