from rest_framework import serializers
from .models import Purchase
from suppliers.models import Supplier
from products.models import Product


class PurchaseSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source="supplier.name", read_only=True)
    product_name = serializers.CharField(source="product.name", read_only=True)

    supplier_id = serializers.PrimaryKeyRelatedField(
        queryset=Supplier.objects.all(),
        source="supplier",
        write_only=True
    )
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",
        write_only=True
    )

    class Meta:
        model = Purchase
        fields = [
            "id",
            "supplier",
            "supplier_name",
            "supplier_id",
            "product",
            "product_name",
            "product_id",
            "quantity",
            "purchase_price",
            "purchase_date",
            "note",
            "created_at",
        ]
        read_only_fields = ["supplier", "product"]