import json
from solana.keypair import Keypair
from solana.rpc.api import Client
from solana.rpc.types import TxOpts
from solana.transaction import Transaction
from solana.system_program import SYS_PROGRAM_ID, create_account
from solana.publickey import PublicKey
from solana.rpc.commitment import Confirmed
from spl.token.constants import TOKEN_PROGRAM_ID
from spl.token.instructions import initialize_mint, create_associated_token_account, mint_to

# Load private key from id.json
with open('id.json', 'r') as file:
    private_key = bytes(json.load(file))

# Create keypair from private key
keypair = Keypair.from_secret_key(private_key)

# Connect to Solana client (Devnet)
client = Client("https://api.devnet.solana.com")

# Create a new mint account (NFT)
new_account = Keypair()
token_mint = new_account.public_key

# Create transaction
transaction = Transaction()

# Create account instruction
create_account_instruction = create_account(
    {
        'from_pubkey': keypair.public_key,
        'new_account_pubkey': token_mint,
        'lamports': client.get_minimum_balance_for_rent_exemption(82)['result'],
        'space': 82,
        'program_id': TOKEN_PROGRAM_ID
    }
)

# Initialize mint instruction
initialize_mint_instruction = initialize_mint(
    {
        'program_id': TOKEN_PROGRAM_ID,
        'mint': token_mint,
        'decimals': 0,
        'mint_authority': keypair.public_key,
        'freeze_authority': keypair.public_key
    }
)

# Add instructions to transaction
transaction.add(create_account_instruction)
transaction.add(initialize_mint_instruction)

# Send transaction
client.send_transaction(transaction, keypair, new_account, opts=TxOpts(skip_preflight=True, preflight_commitment=Confirmed))

# Create associated token account for the mint
associated_token_account = create_associated_token_account(keypair.public_key, keypair.public_key, token_mint)

# Mint to the associated token account
mint_to_instruction = mint_to(
    {
        'program_id': TOKEN_PROGRAM_ID,
        'mint': token_mint,
        'dest': associated_token_account,
        'amount': 1,
        'mint_authority': keypair.public_key
    }
)

# Create and send mint transaction
mint_transaction = Transaction()
mint_transaction.add(mint_to_instruction)
client.send_transaction(mint_transaction, keypair, opts=TxOpts(skip_preflight=True, preflight_commitment=Confirmed))

print(f"NFT created with mint address: {token_mint}")