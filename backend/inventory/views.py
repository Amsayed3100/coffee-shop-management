from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from products.models import Product


class InventoryListView(APIView):
    def get(self, request):
        inventory_data = []

        products = Product.objects.all().order_by("name")

        for product in products:
            if product.stock_quantity == 0:
                stock_status = "Out of Stock"
            elif product.stock_quantity < 10:
                stock_status = "Low Stock"
            else:
                stock_status = "In Stock"

            inventory_data.append({
                "id": product.id,
                "name": product.name,
                "category": product.category.name if product.category else None,
                "stock_quantity": product.stock_quantity,
                "is_available": product.is_available,
                "stock_status": stock_status,
            })

        return Response(inventory_data)