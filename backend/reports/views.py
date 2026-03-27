from django.http import JsonResponse
from products.models import Product, Category


def dashboard_summary(request):
    total_products = Product.objects.count()
    available_products = Product.objects.filter(
        is_available=True,
        stock_quantity__gt=0
    ).count()
    out_of_stock_products = Product.objects.filter(stock_quantity=0).count()
    low_stock_products = Product.objects.filter(
        stock_quantity__gt=0,
        stock_quantity__lt=10
    ).count()
    total_categories = Category.objects.count()

    data = {
        "total_products": total_products,
        "available_products": available_products,
        "out_of_stock_products": out_of_stock_products,
        "low_stock_products": low_stock_products,
        "total_categories": total_categories,
    }

    return JsonResponse(data)