import {Keypair, PublicKey, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";

import {loadKeypairFromFile} from "./lib/helpers";
import {connection} from "./lib/vars";

import dotenv from "dotenv";
import * as process from "process";
import {bundlrStorage, keypairIdentity, Metaplex} from "@metaplex-foundation/js";
import {createTransferInstruction, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID} from "@solana/spl-token";

const fs = require('fs').promises;
dotenv.config();

const payer = loadKeypairFromFile(
    "/home/hknight/PycharmProjects/nft-solana-project/backend/id.json"
);
const args = process.argv.slice(2);
/*
1. name
2. symbol
3. description
4. image
5. address creators
6.loyalty
*/
async function loadFile(filePath: string) {
    try {
        // console.log(`File content:\n${data}`);
        return await fs.readFile(filePath, 'utf8')
    } catch (err) {
        return '';
    }
}
(async () => {
    // console.log("Payer address:", payer.publicKey.toBase58());
    let img = await loadFile("./img_base64.txt");

    const metadata = {
        name: args[0],
        symbol: args[1],
        description: args[2],
        image: img,
    };

    const metaplex = Metaplex.make(connection)
            // set our keypair to use, and pay for the transaction
            .use(keypairIdentity(payer))
            // define a storage mechanism to upload with
            .use(
                bundlrStorage({
                    address: "https://devnet.bundlr.network",
                    providerUrl: "https://api.devnet.solana.com",
                    timeout: 60000,
                })
            );

    // console.log("Uploading metadata...");

    // upload the JSON metadata
    const { uri } = await metaplex.nfts().uploadMetadata(metadata);

    // console.log("Metadata uploaded:", uri);

    // printConsoleSeparator("NFT details");

    // console.log("Creating NFT using Metaplex...");

    const tokenMint = Keypair.generate();

    const creatorAddress = new PublicKey(args[3]);

    // create a new nft using the metaplex sdk
    const { nft, response } = await metaplex.nfts().create({
        uri,
        name: metadata.name,
        symbol: metadata.symbol,
        useNewMint: tokenMint,
        sellerFeeBasisPoints: parseInt(args[4])*100, // Royalty represents 10.00%.
        isMutable: true,
        creators: [
            {
                address: creatorAddress,
                share: 100,
            },
        ]
    });

    console.log(nft);

    // printConsoleSeparator("NFT created:");
    // console.log(explorerURL({ txSignature: response.signature }));
    //
    // console.log("Transferring NFT to creator...");

    // Get the associated token accounts for the sender and recipient
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        tokenMint.publicKey,
        payer.publicKey
    );

    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        tokenMint.publicKey,
        creatorAddress
    );

    // Create the transfer instruction
    const transferInstruction = createTransferInstruction(
        senderTokenAccount.address,
        recipientTokenAccount.address,
        payer.publicKey,
        1, // Transfer 1 NFT token
        [],
        TOKEN_PROGRAM_ID
    );

    // Create and send the transaction
    const transaction = new Transaction().add(transferInstruction);
    const transferSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    );

    // console.log("NFT transferred to creator:");
    // console.log(explorerURL({ txSignature: transferSignature }));
    console.log("json output:", JSON.stringify({
        status: 1,
    }));
})();