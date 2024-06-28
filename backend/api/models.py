from django.db import models


class NFT(models.Model):
    owner = models.CharField(max_length=200, unique=True)
    image_url = models.URLField()
    token_id = models.CharField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
