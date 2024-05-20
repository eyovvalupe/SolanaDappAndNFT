import * as web3 from '@solana/web3.js'
import * as token from '@solana/spl-token'

async function buildCreateMintTransaction (
    connection: web3.Connection,
    payer: web3.PublicKey,
    decimals: number
): Promise<web3.Transaction> {
    const lamports = await token.getMinimumBalanceForRentExemptMint(connection);
    const accountKeypair = web3.Keypair.generate();
    const programId = token.TOKEN_PROGRAM_ID;

    const transaction = new web3.Transaction().add(
        web3.SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: accountKeypair.publicKey,
            space: token.MINT_SIZE,
            lamports,
            programId
        }),
        token.createInitializeMintInstruction(
            accountKeypair.publicKey,
            decimals,
            payer,
            payer,
            programId
        )
    );
    return transaction
}

async function buildCreateTokenAccountTransaction(
  connection: web3.Connection,
  payer: web3.PublicKey,
  mint: web3.PublicKey
): Promise<web3.Transaction> {
  const mintState = await token.getMint(connection, mint)
  const accountKeypair = await web3.Keypair.generate()
  const space = token.getAccountLenForMint(mintState);
  const lamports = await connection.getMinimumBalanceForRentExemption(space);
  const programId = token.TOKEN_PROGRAM_ID

  const transaction = new web3.Transaction().add(
    web3.SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: accountKeypair.publicKey,
      space,
      lamports,
      programId,
    }),
    token.createInitializeAccountInstruction(
      accountKeypair.publicKey,
      mint,
      payer,
      programId
    )
  );

  return transaction
}

async function buildCreateAssociatedTokenAccountTransaction(
    payer: web3.PublicKey,
    mint: web3.PublicKey
  ): Promise<web3.Transaction> {
    const associatedTokenAddress = await token.getAssociatedTokenAddress(mint, payer, false);
  
    const transaction = new web3.Transaction().add(
      token.createAssociatedTokenAccountInstruction(
        payer,
        associatedTokenAddress,
        payer,
        mint
      )
    )
  
    return transaction
  }

  async function buildMintToTransaction(
    authority: web3.PublicKey,
    mint: web3.PublicKey,
    amount: number,
    destination: web3.PublicKey
  ): Promise<web3.Transaction> {
    const transaction = new web3.Transaction().add(
      token.createMintToInstruction(
        mint,
        destination,
        authority,
        amount
      )
    )
  
    return transaction
  }

  async function buildTransferTransaction(
    source: web3.PublicKey,
    destination: web3.PublicKey,
    owner: web3.PublicKey,
    amount: number
  ): Promise<web3.Transaction> {
    const transaction = new web3.Transaction().add(
      token.createTransferInstruction(
        source,
        destination,
        owner,
        amount,
      )
    )
  
    return transaction
  }