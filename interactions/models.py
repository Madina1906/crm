from django.db import models
from django.conf import settings
from contacts.models import Contact

class Interaction(models.Model):
    INTERACTION_TYPES = [
        ('call', 'Call'),
        ('email', 'Email'),
        ('meeting', 'Meeting'),
        ('note', 'Note'),
    ]

    lead = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='interactions')
    interaction_type = models.CharField(max_length=20, choices=INTERACTION_TYPES)
    inter_date = models.DateTimeField(null=True, blank=True)
    notes = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='created_interactions')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_interaction_type_display()} - {self.lead.name}"
