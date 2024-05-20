import { Keypair } from "@solana/web3.js";
import * as fs from 'fs'

export const generateKeypair = async () => {
    const keypair = Keypair.generate();
    await fs.writeFileSync('.env', `SECRET_KEY=${keypair.secretKey.toString()}\nPUBLIC_KEY=${keypair.publicKey}`)
}

generateKeypair()