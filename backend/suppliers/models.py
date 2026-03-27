from django.db import models

# Create your models here.
from django.db import models


class Supplier(models.Model):
    name = models.CharField(max_length=150)
    company_name = models.CharField(max_length=200, blank=True, null=True)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name