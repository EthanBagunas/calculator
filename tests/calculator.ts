import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculator } from "../target/types/calculator";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Calculator as Program<Calculator>;
  const provider =anchor.getProvider();
  const keyPair =anchor.web3.Keypair.generate();


  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize("Hello World!!").accounts({
      calculator: keyPair.publicKey,
      user : provider.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([keyPair])
    .rpc();
    console.log("Your transaction signature", tx);
  });
});
