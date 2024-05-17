import { Keypair } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import dotenv from 'dotenv'
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY
// const keypair = getKeypairFromEnvironment("process.env.SECRET_KEY");
console.log(SECRET_KEY)

console.log(`✅ Finished!`);