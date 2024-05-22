import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";
import * as fs from 'fs';
require('dotenv').config();

export const getKeypair = () => {
    const secretKey = process.env.SECRET_KEY
    let kkk  =  Uint8Array.from(secretKey.split(',').map(aaa => parseInt(aaa)));
    const keypair = Keypair.fromSecretKey(kkk)
    return keypair
}
