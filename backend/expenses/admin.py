from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Expense


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "category", "amount", "expense_date", "created_at"]
    list_filter = ["category", "expense_date"]
    search_fields = ["title", "category"]