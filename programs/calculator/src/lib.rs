use anchor_lang::prelude::*;

declare_id!("32JfkcWscdvsJ65t1YxRz7L9xbCcXgcYEqbvL3cXy66c");

#[program]
pub mod calculator {
    use super::*;
    
    pub fn initialize(ctx: Context<Initialize>, _greeting: String) -> Result<()> {
        let calculator: &mut Account<'_, Calculator> =&mut ctx.accounts.calculator;
        calculator.greeting = _greeting;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
         #[account(init, payer=user, space= 264)]
        pub calculator: Account<'info, Calculator>,
        #[account(mut)]
        pub user: Signer<'info> ,
        pub system_program: Program<'info, System>,
}

#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64, 
}
