from rest_framework import serializers
from .models import NFT


class NFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFT
        fields = ['owner', 'image_url', 'token_id', 'created_at']
