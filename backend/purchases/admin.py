from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Purchase


@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "supplier",
        "product",
        "quantity",
        "purchase_price",
        "purchase_date",
        "created_at",
    ]
    list_filter = ["purchase_date", "supplier", "product"]
    search_fields = ["supplier__name", "product__name"]