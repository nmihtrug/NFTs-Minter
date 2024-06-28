from django.urls import path
from . import views

urlpatterns = [
    # path('confirm-transaction/', views.ConfirmTransactionView.as_view(), name='confirm-transaction'),
    path('generative_image/', views.AIGenerative.as_view(), name='generative_image'),
    path('info/', views.InfoView.as_view(), name='info'),
]
