// npm i @metaplex-foundation/js@0.18.3

import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile } from "@metaplex-foundation/js";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import * as fs from 'fs'
import { get } from 'request'
import { generateKeypair } from "./2secretkey2publickey";
require('dotenv').config()

const connection = new Connection(clusterApiUrl("devnet"));
const wallet = generateKeypair();
const mintAddress = new PublicKey(process.env.MINT_PUBLIC_KEY)

const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(
        bundlrStorage({
            address: "https://devnet.bundlr.network",
            providerUrl: "https://api.devnet.solana.com",
            timeout: 60000
        }),
);

const buffer = fs.readFileSync("./public/img/beth.jpg")
const file = toMetaplexFile(buffer, "image.png")
// const imageUri = await metaplex.storage().upload(file)

// https://arweave.net/_HJYAtoYGnJhqnpNtT9gO7t3s-xbDvo_oyhhLfkZ6do

// const { uri } = await metaplex.nfts().uploadMetadata({
//     name: "My NFT",
//     description: "My description",
//     image: "https://arweave.net/_HJYAtoYGnJhqnpNtT9gO7t3s-xbDvo_oyhhLfkZ6do"
// })

const uri = "https://arweave.net/Y6UI4o_6nHTuSGtDZJJ2KFozKdvevmd6WOh_xNrAOU8"

//create nft

// const { nft } = await metaplex.nfts().create({
//     uri: uri,
//     name: "My NFT",
//     sellerFeeBasisPoints: 0
// },
// { commitment: "finalized" }
// )

//update nft

// const nft = await metaplex.nfts().findByMint({ mintAddress });

// const { response } = await metaplex.nfts().update({
//     nftOrSft: nft,
//     name: "Updated Name",
//     uri: uri,
//     sellerFeeBasisPoints: 100
// },
// { commitment: "finalized" })

//add nft to collection

const collectionNft = await metaplex.nfts().create({
    uri: uri,
    name: "My NFT Collection",
    sellerFeeBasisPoints: 0,
    isCollection: true,
},{
    commitment: "finalized"
});

// const CollectionNft = collectionNft();

const { nft } = await metaplex.nfts().create({
    uri,
    name: "My NFT",
    sellerFeeBasisPoints: 0,
    collection: collectionNft.mintAddress
},{
    commitment: "finalized"
})

await metaplex.nfts().verifyCollection({
    mintAddress: nft.address,
    collectionMintAddress: collectionNft.mintAddress,
    isSizedCollection: true
})

console.log(nft.collection)
console.log(
    `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`
)

// https://explorer.solana.com/address/8ts1Fwcf4pHkB7vG3dCivL3GPrZ1TUqhrvpTKX7pnxU6?cluster=devnet6?cluster=devnet