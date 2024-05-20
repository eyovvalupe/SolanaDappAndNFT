import * as token from "@solana/spl-token"
import { getExplorerLink } from "@solana-developers/helpers"
import * as web3 from "@solana/web3.js"
import { generateKeypair } from './2secretkey2publickey'
import { setEnvValue } from "./6updateEnv"

const connection1 = new web3.Connection(web3.clusterApiUrl("devnet"))

const userd = generateKeypair()

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${userd.publicKey.toBase58()}`
);

export const tokenMint = async ( connection: web3.Connection, user: web3.Keypair ) =>{
    const mintAccount = await token.createMint(
        connection,
        user,
        user.publicKey,
        null,
        2
    )
    setEnvValue("MINT_PUBLIC_KEY", mintAccount.toString());
} 

console.log(await tokenMint(connection1, userd));