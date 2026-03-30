from rest_framework import generics, permissions
from .models import Expense
from .serializers import ExpenseSerializer
from accounts.permissions import IsAdminRole


class ExpenseListCreateView(generics.ListCreateAPIView):
    queryset = Expense.objects.all().order_by("-created_at")
    serializer_class = ExpenseSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.IsAuthenticated()]
        return [IsAdminRole()]


class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAdminRole]