from django.urls import path
from .views import InteractionListView, InteractionCreateView, InteractionUpdateView

urlpatterns = [
    path('', InteractionListView.as_view(), name='interaction-list'),
    path('create/', InteractionCreateView.as_view(), name='interaction-create'),
    path('<int:pk>/edit/', InteractionUpdateView.as_view(), name='interaction-update'),
]
