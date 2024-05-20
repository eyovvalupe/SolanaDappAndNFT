import { Connection, LAMPORTS_PER_SOL, PublicKey,  } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const airDropSol = async ( sender ) => {
    try {
        const fromAirDropSignature = await connection.requestAirdrop(sender, 5 * LAMPORTS_PER_SOL)
        const latestBlockHash = await connection.getLatestBlockhash()
    
        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: fromAirDropSignature,
          });
    } catch(err) {
        console.error(err)
    }
}

const sender = new PublicKey("FQAibyvvC1JSMMCUFEfu1eSpJn7JhX4SHbKRB48hRaq5")

await airDropSol(sender);

const balanceInLamports = await connection.getBalance(sender);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `✅ The balance for the wallet at address ${sender} is ${balanceInSOL}!`
);
  