from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ("ADMIN", "Admin"),
        ("STAFF", "Staff"),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="STAFF")

    def __str__(self):
        return self.username
    
    from django.contrib.auth import get_user_model

User = get_user_model()

def create_default_admin():
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser(
            username="admin",
            email="admin@gmail.com",
            password="admin123"
        )