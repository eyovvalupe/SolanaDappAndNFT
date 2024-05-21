import { Keypair } from "@solana/web3.js";
import * as fs from 'fs'
import { setEnvValue } from "./6updateEnv";

export const generateKeypair = async () => {
    const keypair = Keypair.generate();
    // await fs.writeFileSync('.env', `SECRET_KEY=${keypair.secretKey.toString()}\nPUBLIC_KEY=${keypair.publicKey}`)
    setEnvValue("RECIPIENT_ADDRESS", keypair.publicKey)
}

generateKeypair()