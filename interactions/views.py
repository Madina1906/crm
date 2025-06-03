from django.views.generic import ListView, CreateView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from rest_framework import viewsets
from .models import Interaction
from .forms import InteractionForm
from .serializers import InteractionSerializer


class InteractionsViewSet(viewsets.ModelViewSet):
    queryset = Interaction.objects.all()
    serializer_class = InteractionSerializer
class InteractionListView(LoginRequiredMixin, ListView):
    model = Interaction
    template_name = 'interactions/interaction_list.html'
    context_object_name = 'interactions'
    ordering = '-created_at'

    def get_queryset(self):
        queryset = Interaction.objects.select_related('lead', 'created_by').all().order_by('-created_at')
        if not self.request.user.is_superuser and not self.request.user.is_staff:
            queryset = queryset.filter(created_by=self.request.user)
        return queryset


class InteractionCreateView(LoginRequiredMixin, CreateView):
    model = Interaction
    form_class = InteractionForm
    template_name = 'interactions/interaction_form.html'
    success_url = reverse_lazy('interaction-list')

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        return super().form_valid(form)


class InteractionUpdateView(LoginRequiredMixin, UpdateView):
    model = Interaction
    form_class = InteractionForm
    template_name = 'interactions/interaction_form.html'
    success_url = reverse_lazy('interaction-list')
