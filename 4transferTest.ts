import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

// const suppliedPublicKey = process.argv[2];
// if (!suppliedPublicKey) {
//   throw new Error("Provide a public key to check the balance of!");
// }

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const newKey = Keypair.generate();
// const newKey = "DxvRGX14xFE6fj7u1AkXGSduXaKBXfgBa6YstVeKqSUg"

const sender = new PublicKey(newKey.publicKey)

//Execute the airDropSol if there is no SOL in the wallet 24 hours after previous airDropSol executed


// const airDropSol = async () => {
  //   try {
    //     const fromAirDropSignature = await connection.requestAirdrop(sender, 1 * LAMPORTS_PER_SOL)
    //     const latestBlockHash = await connection.getLatestBlockhash()
    
    //     await connection.confirmTransaction({
      //       blockhash: latestBlockHash.blockhash,
      //       lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      //       signature: fromAirDropSignature,
      //     });
      //   } catch(err) {
        //     console.error(err)
        //   }
        // }
        
        // await airDropSol();
        
const balanceInLamports = await connection.getBalance(sender);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `✅ The balance for the wallet at address ${sender} is ${balanceInSOL}!`
);

const transaction = new Transaction();

const receipient = new PublicKey('7ihs612yPRpBUyPVqEA8rpVLdncKKW3TyxPtuapHRUNK')

const LAMPORTS_TO_SEND = 500;

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: sender,
  toPubkey: receipient,
  lamports: LAMPORTS_TO_SEND
});

transaction.add(sendSolInstruction);

const balanceInLamports1 = await connection.getBalance(receipient);

const balanceInSOL1 = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `✅ Finished! The balance for the wallet at address ${receipient} is ${balanceInSOL1}!`
);

const signature = await sendAndConfirmTransaction(connection, transaction,[]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${receipient}. `
);
console.log(`Transaction signature is ${signature}!`);

// const Web3 = require('web3');
// const { Keypair, Connection, Transaction, SystemProgram } = require('@solana/web3.js');
// import dotenv from 'dotenv'
// dotenv.config()

// // Initialize Web3 provider
// const web3 = new Web3('https://api.mainnet-beta.solana.com');

// // Sender's private key (replace with your own)
// const senderPrivateKey = [182,11,91,22,101,156,101,184,41,96,160,163,248,99,38,137,32,171,48,218,98,193,102,138,13,138,25,123,139,146,170,149,23,91,100,250,244,15,172,75,205,211,59,108,60,36,6,141,2,162,154,13,8,108,132,233,219,59,32,209,29,240,123,53];

// // Recipient's address
// const recipientAddress = '7ihs612yPRpBUyPVqEA8rpVLdncKKW3TyxPtuapHRUNK';

// async function transferSOL() {
//     // Create a new keypair from the sender's private key
//     const senderAccount = Keypair.fromSecretKey(new Uint8Array(new Buffer.from(senderPrivateKey, 'hex')));

//     // Get recent blockhash
//     const connection = new Connection(web3.currentProvider);
//     const { blockhash } = await connection.getRecentBlockhash();

//     // Create and sign transaction
//     const transaction = new Transaction().add(
//         SystemProgram.transfer({
//             fromPubkey: senderAccount.publicKey,
//             toPubkey: recipientAddress,
//             lamports: 1000000, // Amount in lamports (1 SOL = 1,000,000 lamports)
//         })
//     );

//     // Sign transaction
//     transaction.recentBlockhash = blockhash;
//     transaction.sign(senderAccount);

//     // Send transaction
//     const signature = await connection.sendTransaction(transaction);

//     console.log('Transaction signature:', signature);
// }

// transferSOL().catch(console.error);


