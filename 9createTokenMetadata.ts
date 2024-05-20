require('dotenv').config()
import { clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, Transaction } from '@solana/web3.js'
import { generateKeypair } from './2secretkey2publickey'
import { tokenMint } from './7createTokenMintAddress';
import { getExplorerLink } from '@solana-developers/helpers';
import { createCreateEscrowAccountInstruction, createCreateMetadataAccountV3Instruction, createMetadataAccountArgsV3Beet, createMetadataAccountV3InstructionDiscriminator } from '@metaplex-foundation/mpl-token-metadata';
require('dotenv').config()

const user = generateKeypair()
const connection =new Connection(clusterApiUrl("devnet"));
console.log(
  `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);
const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")

const mintAccount = process.env.MINT_PUBLIC_KEY

const tokenMintAccount = new PublicKey(mintAccount)

const metadataData = {
  name: "Reward Token",
  symbol: "RWT",
  uri: "https://arweave.net/1234",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
}

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenMintAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID
);

const metadataPDA = metadataPDAAndBump[0];

const transaction = new Transaction();

const createMetadataAccountInstruction = 
  createCreateMetadataAccountV3Instruction (
    {
      metadata: metadataPDA,
      mint: tokenMintAccount,
      mintAuthority: user.publicKey,
      payer: user.publicKey,
      updateAuthority: user.publicKey
    }, {
        createMetadataAccountArgsV3: {
          data: metadataData,
          isMutable: true,
          collectionDetails: null
        }
      }
    
)

transaction.add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [user]
);

console.log("transactionSignature=======>", transactionSignature)

const transactionLink = getExplorerLink(
  "transaction",
  transactionSignature,
  // 'wi9DTizTtqALKbo2Zz4Hmzu2XWkz85VWm79wEtuuLvJzPdGk7tDhJoWN2ixCicGgcVd1kHNVMzpQNnf5UGLQ397',
  "devnet"
);

console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);

const tokenMintLink = getExplorerLink(
  "address",
  tokenMintAccount.toString(),
  "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);

// ✅ Transaction confirmed, explorer link is: https://explorer.solana.com/tx/wi9DTizTtqALKbo2Zz4Hmzu2XWkz85VWm79wEtuuLvJzPdGk7tDhJoWN2ixCicGgcVd1kHNVMzpQNnf5UGLQ397?cluster=devnet!
// ✅ Look at the token mint again: https://explorer.solana.com/address/DUJCodVFR3LFvfCRYo4xgVNKf9gEJZasnEnZmK1oohSL?cluster=devnet!