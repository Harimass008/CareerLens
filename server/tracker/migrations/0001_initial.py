from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    initial = True
    dependencies = [migrations.swappable_dependency(settings.AUTH_USER_MODEL)]
    operations = [migrations.CreateModel(name="Application", fields=[
        ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
        ("company", models.CharField(max_length=120)), ("role", models.CharField(max_length=160)),
        ("location", models.CharField(blank=True, max_length=120)), ("job_url", models.URLField(blank=True)),
        ("status", models.CharField(choices=[("saved", "Saved"), ("applied", "Applied"), ("assessment", "Assessment"), ("interview", "Interview"), ("offer", "Offer"), ("rejected", "Rejected")], default="saved", max_length=20)),
        ("applied_date", models.DateField(blank=True, null=True)), ("salary_range", models.CharField(blank=True, max_length=100)),
        ("notes", models.TextField(blank=True)), ("next_step", models.CharField(blank=True, max_length=180)),
        ("created_at", models.DateTimeField(auto_now_add=True)), ("updated_at", models.DateTimeField(auto_now=True)),
        ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="applications", to=settings.AUTH_USER_MODEL)),
    ], options={"ordering": ["-updated_at"]})]
