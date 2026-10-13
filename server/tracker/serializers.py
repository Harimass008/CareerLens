from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Application

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["id", "company", "role", "location", "job_url", "status", "applied_date", "salary_range", "notes", "next_step", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
