from django import forms
from .models import Interaction

class InteractionForm(forms.ModelForm):
    inter_date = forms.DateTimeField(
        widget=forms.DateTimeInput(attrs={'type': 'datetime-local', 'class': 'form-control'}),
        input_formats=['%d-%m-%YT%H:%M']
    )

    class Meta:
        model = Interaction
        fields = ['lead', 'interaction_type', 'inter_date', 'notes']
