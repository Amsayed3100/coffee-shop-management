from django.db import models

# Create your models here.
from django.db import models


class Expense(models.Model):
    CATEGORY_CHOICES = [
        ("Rent", "Rent"),
        ("Electricity", "Electricity"),
        ("Salary", "Salary"),
        ("Maintenance", "Maintenance"),
        ("Other", "Other"),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="Other")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_date = models.DateField()
    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title