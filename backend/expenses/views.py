from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Expense
from .serializers import ExpenseSerializer


class ExpenseListCreateView(generics.ListCreateAPIView):
    queryset = Expense.objects.all().order_by("-created_at")
    serializer_class = ExpenseSerializer


class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer