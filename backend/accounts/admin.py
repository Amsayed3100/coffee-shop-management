from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ["id", "username", "email", "role", "is_staff", "is_superuser"]
    list_filter = ["role", "is_staff", "is_superuser"]

    fieldsets = UserAdmin.fieldsets + (
        ("Role Information", {"fields": ("role",)}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Role Information", {"fields": ("role",)}),
    )