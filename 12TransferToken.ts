import { Connection, clusterApiUrl } from "@solana/web3.js";
import { generateKeypair } from "./2secretkey2publickey";

const connection = new Connection(clusterApiUrl("devnet"))
const sender = generateKeypair();
