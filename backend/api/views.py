import json
import time

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.views import APIView
from rest_framework import status
from solana.rpc.api import Client
from solana.rpc.commitment import Confirmed
from solana.transaction import Transaction, Signature
from base64 import b64decode
from base58 import b58decode

import replicate
import os

from dotenv import load_dotenv

load_dotenv()


# Create your views here.
class InfoView(APIView):
    def get(self, request):
        return Response({'success': True, 'data': {
            "server_address": os.getenv("PUBLIC_KEY_SERVER_SOLANA"),
            "fee_generative_image": os.getenv("FEE_GENERATIVE_IMAGE_SOL"),
            "fee_create_nft": os.getenv("FEE_CREATE_NFT_SOL")
        }}, status=200)


class AIGenerative(APIView):
    def post(self, request):
        try:
            prompt = request.data.get('prompt')
            serialized_transaction = request.data.get('transaction')
            time.sleep(6)
            confirm = confirmTransaction(serialized_transaction, int(float(os.getenv("FEE_GENERATIVE_IMAGE_SOL"))*float(1000000000)))
            print(confirm)
            if not confirm['success']:
                return Response({'success': False}, status=200)

            os.environ["REPLICATE_API_TOKEN"] = 'r8_Ut5nXCUcxVayHHqWIFyu8DpCweVj0g52Xg1PE'

            output = replicate.run(
                "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
                input={
                    "width": 1024,
                    "height": 1024,
                    "prompt": prompt,
                    "scheduler": "K_EULER",
                    "num_outputs": 1,
                    "guidance_scale": 0,
                    "negative_prompt": "worst quality, low quality",
                    "num_inference_steps": 4
                }
            )
            return Response({'success': True, 'url': output[0]}, status=200)
        except Exception as e:
            print(e)
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def confirmTransaction(serialized_transaction, expected_amount):
    transaction = Transaction.deserialize(b64decode(serialized_transaction))

    # Verify the transaction details
    is_valid = False
    for ix in transaction.instructions:
        if str(ix.program_id) == '11111111111111111111111111111111':  # System Program ID
            # Extract the destination and amount from the instruction data
            to_pubkey = str(ix.accounts[1].pubkey)
            amount = int.from_bytes(ix.data[4:12], 'little')
            if to_pubkey == os.getenv("PUBLIC_KEY_SERVER_SOLANA") and amount == expected_amount:
                is_valid = True
                break

    if not is_valid:
        return {'success': False, 'error': 'Invalid transaction details'}

    # Send and confirm the transaction
    client = Client("https://api.devnet.solana.com")
    response = json.loads(client.send_raw_transaction(transaction.serialize()).to_json())
    signature = response['result']
    print(signature)
    # Confirm the transaction
    try:
        client.confirm_transaction(Signature(b58decode(signature)), commitment=Confirmed)
        return {'success': True}
    except Exception as e:
        print(e)
        return {'success': False, 'error': 'Fail transaction confirm'}

# class ConfirmTransactionView(APIView):
#     def post(self, request):
#         try:
#             serialized_transaction = request.data.get('transaction')
#             expected_recipient = request.data.get('expectedRecipient')
#             expected_amount = request.data.get('expectedAmount')
#
#             # Deserialize the transaction
#             transaction = Transaction.deserialize(b64decode(serialized_transaction))
#
#             # Verify the transaction details
#             is_valid = False
#             for ix in transaction.instructions:
#                 if str(ix.program_id) == '11111111111111111111111111111111':  # System Program ID
#                     # Extract the destination and amount from the instruction data
#                     to_pubkey = str(ix.accounts[1].pubkey)
#                     amount = int.from_bytes(ix.data[4:12], 'little')
#
#                     if to_pubkey == expected_recipient and amount == expected_amount:
#                         is_valid = True
#                         break
#
#             if not is_valid:
#                 return Response({'success': False, 'error': 'Invalid transaction details'},
#                                 status=status.HTTP_400_BAD_REQUEST)
#
#             # Send and confirm the transaction
#             client = Client("https://api.devnet.solana.com")
#             response = json.loads(client.send_raw_transaction(transaction.serialize()).to_json())
#             signature = response['result']
#             # Confirm the transaction
#             confirmation = client.confirm_transaction(Signature(b58decode(signature)), commitment=Confirmed)
#             print(confirmation)
#             return Response({'success': True, 'signature': signature})
#
#         except Exception as e:
#             return Response({'success': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
