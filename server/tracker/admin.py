from django.contrib import admin
from .models import Application

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("company", "role", "status", "user", "updated_at")
    list_filter = ("status",)
    search_fields = ("company", "role", "user__username")
