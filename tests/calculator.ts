import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculator } from "../target/types/calculator";
import { assert } from "chai";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Calculator as Program<Calculator>;
  const provider =anchor.getProvider();
  const keyPair =anchor.web3.Keypair.generate();


  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
    .initialize("Hello World!!")
    .accounts({
      calculator: keyPair.publicKey,
      user : provider.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([keyPair])
    .rpc();

    const {greeting } = await program.account.calculator.fetch(keyPair.publicKey);


    //assert.ok(greeting === "Hello World");
    console.log("Your transaction signature", tx);
  });

  it ("should add", async ()=>{
    await program.methods
    .add(new anchor.BN(1) , new anchor.BN(1))    
    .accounts({
      calculator: keyPair.publicKey,
    })
    .rpc();
    const { result } = await program.account.calculator.fetch(
      keyPair.publicKey
    )
    console.log(result)

  })
});
