from django.conf import settings
from django.db import models

class Application(models.Model):
    STATUS_CHOICES = [
        ("saved", "Saved"), ("applied", "Applied"), ("assessment", "Assessment"),
        ("interview", "Interview"), ("offer", "Offer"), ("rejected", "Rejected"),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applications")
    company = models.CharField(max_length=120)
    role = models.CharField(max_length=160)
    location = models.CharField(max_length=120, blank=True)
    job_url = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="saved")
    applied_date = models.DateField(null=True, blank=True)
    salary_range = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)
    next_step = models.CharField(max_length=180, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.role} at {self.company}"
